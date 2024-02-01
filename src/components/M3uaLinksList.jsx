import React, { useState } from 'react';
import BaseLinkList from './BaseLinkList';
import CreateM3uaLinkModal from './modals/CreateM3uaLinkModal';
import DeleteM3uaLinkModal from './modals/DeleteM3uaLinkModal';
import M3uaLinkItem from './M3uaLinkItem';
import M3uaLinkService from '../API/M3uaLinksService';
import { SERVER_ERROR } from '../config';
import EditM3uaLinkModal from './modals/EditM3uaLinkModal';
import ErrorText from './ErrorText';


const M3uaLinkList = ({ links, updateLinks, isUpdating }) => {

    const [isModalShow, setIsModalShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function toggleModal() {
        setIsModalShow(!isModalShow);
    }

    function showModalAndSetIdAndType(id, type) {
        toggleModal();
        if (id) {
            setCurrentId(id);
        }
        setModalType(type);
    }

    function showModalAndSetLinkAndType(link, type) {
        console.log("type: " + type)
        toggleModal();
        setLink(link);
        setModalType(type);
    }

    async function accept(serviceMethod, successStatus) {
        setIsLoading(true);
        const response = await serviceMethod(currentId);

        if (response && response.status === successStatus) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message);
        } else {
            alert(SERVER_ERROR);
        }

        toggleModal();
        setIsLoading(false);
    }

    async function acceptToDeleteM3uaLink() {
        accept(M3uaLinkService.delete, 204)
    }


    function getModal() {
        if (modalType === "DELETE") {
            return <DeleteM3uaLinkModal isOpen={isModalShow} accept={acceptToDeleteM3uaLink} isLoading={isLoading} close={toggleModal} />;
        }
        if (modalType === "CREATE") {
            return <CreateM3uaLinkModal isOpen={isModalShow} update={updateLinks} close={toggleModal} />
        }
        if (modalType === "COPY") {
            return <CreateM3uaLinkModal isOpen={isModalShow} update={updateLinks} close={toggleModal} link={link} />
        }
        if (modalType === "EDIT") {
            return <EditM3uaLinkModal isOpen={isModalShow} update={updateLinks} close={toggleModal} link={link} />
        }
        return;
    }


    function addLinkButton() {
        return (<button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={() => showModalAndSetIdAndType(null, "CREATE")}>
            <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
            Create M3UA-link
        </button>
        )
    }


    function loadM3uaLinks() {
        if (links === null) {
            return (
                <div class="text-center">
                    <ErrorText text={"An error occurred during loading M3UA-links: Server don't response"} />
                </div>
            )
        }

        if (links.length === 0) {
            return (
                <div className='text-center'>
                    {addLinkButton()}
                </div>
            );
        }

        return <>
            <table class="text-center table table-striped table-sm">
                <thead class="bg-body-tertiary">
                    <tr>
                        <th class="text-900">NAME</th>
                        <th class="text-900">TYPE</th>
                        <th class="text-900">OPC</th>
                        <th class="text-900">DPC</th>
                        <th class="text-900">SSN</th>
                        <th class="text-900">FUNCTIONALITY</th>
                        <th class="text-900">NI</th>
                        <th class="text-900">RС</th>
                        <th class="text-900">NA</th>
                        <th class="text-900">LONG MESSAGE RULE</th>
                        <th class="text-900">STATE</th>
                        <th class="text-900"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        links.map(link => <M3uaLinkItem
                            link={link}
                            key={link.id}
                            deleteItem={showModalAndSetIdAndType}
                            copyItem={showModalAndSetLinkAndType}
                            editItem={showModalAndSetLinkAndType}
                        />)
                    }
                </tbody>
            </table>
            {addLinkButton()}
        </>
    }

    return (
        <BaseLinkList
            nameList="M3UA"
            table={loadM3uaLinks()}
            isUpdating={isUpdating}
            modal={getModal()}
        />
    )
};

export default M3uaLinkList;