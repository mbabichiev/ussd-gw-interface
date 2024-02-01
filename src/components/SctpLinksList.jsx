import React, { useState } from 'react';
import SctpLinkService from '../API/SctpLinkService';
import { SERVER_ERROR } from '../config';
import BaseLinkList from './BaseLinkList';
import ErrorText from './ErrorText';
import CreateSctpLinkModal from './modals/CreateSctpLinkModal';
import DeleteSctpLinkModal from './modals/DeleteSctpLinkModal';
import EditSctpLinkModal from './modals/EditSctpLinkModal';
import RestartSctpLinkModal from './modals/RestartSctpLinkModal';
import SctpLinkInfoModal from './modals/SctpLinkInfoModal';
import StartSctpLinkModal from './modals/StartSctpLinkModal';
import StopSctpLinkModal from './modals/StopSctpLinkModal';
import SctpLinkItem from './SctpLinkItem';


const SctpLinksList = ({ links, updateLinks, isUpdating }) => {

    const [isModalShow, setIsModalShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function toggleModal() {
        setIsModalShow(!isModalShow);
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

    async function accepToStartItem() {
        accept(SctpLinkService.start, 202)
    }

    async function accepToRestartItem() {
        accept(SctpLinkService.restart, 202)
    }

    async function accepToStopItem() {
        accept(SctpLinkService.stop, 202)
    }

    async function acceptToDeleteSctpLink() {
        accept(SctpLinkService.delete, 204)
    }

    function showModalAndSetIdAndType(id, type) {
        toggleModal();
        if (id) {
            setCurrentId(id);
        }
        setModalType(type);
    }

    function showModalAndSetLinkAndType(link, type) {
        toggleModal();
        setLink(link);
        setModalType(type);
    }


    function getModal() {
        if (modalType === "START") {
            return <StartSctpLinkModal isOpen={isModalShow} isLoading={isLoading} accept={accepToStartItem} close={toggleModal} />
        }
        if (modalType === "RESTART") {
            return <RestartSctpLinkModal isOpen={isModalShow} isLoading={isLoading} accept={accepToRestartItem} close={toggleModal} />
        }
        if (modalType === "STOP") {
            return <StopSctpLinkModal isOpen={isModalShow} isLoading={isLoading} accept={accepToStopItem} close={toggleModal} />
        }
        if (modalType === "DELETE") {
            return <DeleteSctpLinkModal isOpen={isModalShow} isLoading={isLoading} accept={acceptToDeleteSctpLink} close={toggleModal} />;
        }
        if (modalType === "CREATE") {
            return <CreateSctpLinkModal isOpen={isModalShow} update={updateLinks} close={toggleModal} />
        }
        if (modalType === "COPY") {
            return <CreateSctpLinkModal isOpen={isModalShow} update={updateLinks} close={toggleModal} link={link} />
        }
        if (modalType === "EDIT") {
            return <EditSctpLinkModal isOpen={isModalShow} update={updateLinks} close={toggleModal} link={link} />
        }
        if (modalType === "INFO") {
            return <SctpLinkInfoModal isOpen={isModalShow} close={toggleModal} link={link} />
        }

        return;
    }


    function addLinkButton() {
        return (<button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={() => showModalAndSetIdAndType(null, "CREATE")}>
            <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
            Create SCTP-link
        </button>
        )
    }


    function loadSctpLinks() {
        if (links === null) {
            return (
                <div class="text-center">
                    <ErrorText text={"An error occurred during loading SCTP-links: Server don't response"} />
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
                        <th class="text-900">LOCAL ADDRESSES</th>
                        <th class="text-900">LOCAL PORT</th>
                        <th class="text-900">REMOTE ADDRESSES</th>
                        <th class="text-900">REMOTE PORT</th>
                        <th class="text-900">STATE</th>
                        <th class="text-900"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        links.map(link => <SctpLinkItem
                            link={link}
                            startItem={showModalAndSetIdAndType}
                            restartItem={showModalAndSetIdAndType}
                            stopItem={showModalAndSetIdAndType}
                            deleteItem={showModalAndSetIdAndType}
                            copyItem={showModalAndSetLinkAndType}
                            editItem={showModalAndSetLinkAndType}
                            infoItem={showModalAndSetLinkAndType}
                            key={link.id} />)
                    }
                </tbody>
            </table>
            {addLinkButton()}
        </>
    }


    return (
        <BaseLinkList
            nameList="SCTP"
            table={loadSctpLinks()}
            isUpdating={isUpdating}
            modal={getModal()}
        />
    )
};

export default SctpLinksList;