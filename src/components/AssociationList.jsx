import React, { useState } from 'react';
import AssociationService from '../API/AssociationService';
import { SERVER_ERROR } from '../config';
import AssociationItem from './AssociationItem';
import BaseLinkList from './BaseLinkList';
import ErrorText from './ErrorText';
import CreateAssociationModal from './modals/CreateAssociationModal';
import DeleteAssociationModal from './modals/DeleteAssociationModal';


const AssociationList = ({ associations, updateLinks, sctpLinkList, m3uaLinkList, isUpdating }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isCreateModalShow, setIsCreateModalShow] = useState(false);

    function toggleCreateModal() {
        setIsCreateModalShow(!isCreateModalShow);
    }

    function toggleDeleteModal() {
        setShowDeleteModal(!showDeleteModal);
    }

    function showDeleteItem(id) {
        toggleDeleteModal();
        setCurrentId(id);
    }

    async function acceptToDeleteItem() {
        setIsLoading(true);
        const response = await AssociationService.delete(currentId);

        if (response && response.status === 204) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message)
        } else {
            alert(SERVER_ERROR)
        }
        toggleDeleteModal();
        setIsLoading(false);
    }


    function getModal() {
        if (isCreateModalShow) {
            return <CreateAssociationModal
                isOpen={isCreateModalShow}
                update={updateLinks}
                close={toggleCreateModal}
                sctpLinkList={sctpLinkList}
                m3uaLinkList={m3uaLinkList}
            />
        }
        if (showDeleteModal) {
            return <DeleteAssociationModal isOpen={showDeleteModal} isLoading={isLoading} accept={acceptToDeleteItem} close={toggleDeleteModal} />
        }
        return;
    }


    function addLinkButton() {
        return (<button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={() => toggleCreateModal(null, "CREATE")}>
            <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
            Add association
        </button>
        )
    }


    function loadAssociations() {
        if (associations === null) {
            return (
                <div class="text-center">
                    <ErrorText text={"An error occurred during loading associations: Server don't response"} />
                </div>
            )
        }
        if (associations.length === 0) {
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
                        <th class="text-900">SCTP LINK NAME</th>
                        <th class="text-900">M3UA LINK NAME</th>
                        <th class="text-900"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        associations.map(association => <AssociationItem association={association} deleteItem={showDeleteItem} key={association.id} />)
                    }
                </tbody>
            </table>
            {addLinkButton()}
        </>
    }


    return (
        <BaseLinkList
            nameList="ASSOCIATIONS"
            table={loadAssociations()}
            isUpdating={isUpdating}
            modal={getModal()}
        />
    )
};

export default AssociationList;