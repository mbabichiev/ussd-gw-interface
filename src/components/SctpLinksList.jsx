import React, { useState } from 'react';
import SctpLinkService from '../API/SctpLinkService';
import { SERVER_ERROR } from '../config';
import BaseLinkList from './BaseLinkList';
import CreateSctpLinkForm from './CreateSctpLinkForm';
import DeleteSctpLinkModal from './modals/DeleteSctpLinkModal';
import RestartSctpLinkModal from './modals/RestartSctpLinkModal';
import StartSctpLinkModal from './modals/StartSctpLinkModal';
import StopSctpLinkModal from './modals/StopSctpLinkModal';
import SctpLinkItem from './SctpLinkItem';


const SctpLinksList = ({ links, updateLinks, isUpdating }) => {

    const [isCreateModalShow, setIsCreateModalShow] = useState(false);
    const [isStartModalShow, setIsStartModalShow] = useState(false);
    const [isRestartModalShow, setIsRestartModalShow] = useState(false);
    const [isStopModalShow, setIsStopModalShow] = useState(false);
    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function toggleCreateModal() {
        setIsCreateModalShow(!isCreateModalShow);
    }

    function toggleStartModal() {
        setIsStartModalShow(!isStartModalShow);
    }

    function toggleRestartModal() {
        setIsRestartModalShow(!isRestartModalShow);
    }

    function toggleStopModal() {
        setIsStopModalShow(!isStopModalShow);
    }

    function toggleDeleteModal() {
        setIsDeleteModalShow(!isDeleteModalShow);
    }


    async function accepToStartItem() {
        setIsLoading(true);
        const response = await SctpLinkService.start(currentId);

        if(response && response.status === 202) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message)
        } else {
            alert(SERVER_ERROR)
        }
        toggleStartModal();
        setIsLoading(false);
    }

    async function accepToRestartItem() {
        setIsLoading(true);
        const response = await SctpLinkService.restart(currentId);

        if(response && response.status === 202) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message)
        } else {
            alert(SERVER_ERROR)
        }
        toggleRestartModal();
        setIsLoading(false);
    }

    async function accepToStopItem() {
        setIsLoading(true);
        const response = await SctpLinkService.stop(currentId);

        if(response && response.status === 202) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message)
        } else {
            alert(SERVER_ERROR)
        }
        toggleStopModal();
        setIsLoading(false);
    }

    async function acceptToDeleteSctpLink() {
        setIsLoading(true);
        const response = await SctpLinkService.delete(currentId);

        if(response && response.status === 204) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message)
        } else {
            alert(SERVER_ERROR)
        }
        toggleDeleteModal();
        setIsLoading(false);
    }

    function showStartItem(id) {
        toggleStartModal();
        setCurrentId(id);
    }

    function showRestartItem(id) {
        toggleRestartModal();
        setCurrentId(id);
    }

    function showStopItem(id) {
        toggleStopModal();
        setCurrentId(id);
    }

    function showDeleteItem(id) {
        toggleDeleteModal();
        setCurrentId(id);
    }

    function getModal() {
        if (isStartModalShow) {
            return <StartSctpLinkModal isOpen={isStartModalShow} isLoading={isLoading} accept={accepToStartItem} close={toggleStartModal} />
        }
        if(isRestartModalShow) {
            return <RestartSctpLinkModal isOpen={isRestartModalShow} isLoading={isLoading} accept={accepToRestartItem} close={toggleRestartModal} />
        }
        if(isStopModalShow) {
            return <StopSctpLinkModal isOpen={isStopModalShow} isLoading={isLoading} accept={accepToStopItem} close={toggleStopModal}/>
        }
        if(isDeleteModalShow) {
            return <DeleteSctpLinkModal isOpen={isDeleteModalShow} isLoading={isLoading} accept={acceptToDeleteSctpLink} close={toggleDeleteModal}/> ;
        }
        if(isCreateModalShow) {
            return <CreateSctpLinkForm update={updateLinks} close={toggleCreateModal}/>
        }
        return;
    }

    function loadSctpLinks() {
        if (links === null) {
            return <div>An error occurred during loading SCTP-links</div>
        }
        if (links.length === 0) {
            return <div>No SCTP-links</div>;
        }

        return <table class="text-center table table-striped table-sm">
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
                        startItem={showStartItem}
                        restartItem={showRestartItem}
                        stopItem={showStopItem}
                        deleteItem={showDeleteItem}
                        key={link.id} />)
                }
            </tbody>
        </table>
    }


    return (
        <BaseLinkList
            nameList="SCTP"
            table={loadSctpLinks()}
            createButtonName={"Create SCTP-link"}
            toggleCreateModal={toggleCreateModal}
            form={<CreateSctpLinkForm update={updateLinks} />}
            isUpdating={isUpdating}
            modal={getModal()}
        />
    )
};

export default SctpLinksList;