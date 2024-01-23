import React, { useState } from 'react';
import AssociationService from '../API/AssociationService';
import { SERVER_ERROR } from '../config';
import AssociationItem from './AssociationItem';
import BaseLinkList from './BaseLinkList';
import CreateAssociationForm from './CreateAssocoationForm';
import DeleteAssociationModal from './modals/DeleteAssociationModal';


const AssociationList = ({ associations, updateLinks, sctpLinkList, m3uaLinkList, isUpdating }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function toggleModal() {
        setShowDeleteModal(!showDeleteModal);
    }

    function showDeleteItem(id) {
        toggleModal();
        setCurrentId(id);
    }

    async function acceptToDeleteItem() {
        setIsLoading(true);
        const response = await AssociationService.delete(currentId);

        if(response && response.status === 204) {
            await updateLinks();
        } else if (response && response.status === 400) {
            alert(response.data.message)
        } else {
            alert(SERVER_ERROR)
        }
        toggleModal();
        setIsLoading(false);
    }


    function loadAssociations() {
        if (associations === null) {
            return <div>An error occurred during loading associations</div>
        }
        if (associations.length === 0) {
            return <div>No associations</div>;
        }

        return <table class="text-center table table-striped table-sm">
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

    }


    return (
        <>
            <BaseLinkList
                nameList="ASSOCIATIONS"
                table={loadAssociations()}
                createButtonName={"Add association"}
                form={<CreateAssociationForm update={updateLinks} sctpLinkList={sctpLinkList} m3uaLinkList={m3uaLinkList} />}
                modal={<DeleteAssociationModal isOpen={showDeleteModal} isLoading={isLoading} accept={acceptToDeleteItem} close={toggleModal}/>}
                isUpdating={isUpdating}
            />
        </>
    )
};

export default AssociationList;