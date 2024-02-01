import React from 'react';
import CreateAssociationForm from '../CreateAssociationForm';
import BaseCreateModalForm from './BaseCreateModalForm';


const CreateAssociationModal = ({ isOpen, update, close, sctpLinkList, m3uaLinkList }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Add association"}
            close={close}
            indentations={5}
            width={"modal-dialog"}
        >
            <CreateAssociationForm update={update} close={close} sctpLinkList={sctpLinkList} m3uaLinkList={m3uaLinkList}/>
        </BaseCreateModalForm>
    )
};

export default CreateAssociationModal;