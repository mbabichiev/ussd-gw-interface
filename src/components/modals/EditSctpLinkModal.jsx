import React from 'react';
import EditSctpLinkForm from '../EditSctpLinkForm';
import BaseCreateModalForm from './BaseCreateModalForm';

const EditSctpLinkModal = ({ isOpen, update, close, link }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Edit SCTP-link"}
            close={close}
            indentations={2}
            width={"modal-dialog"}
        >
            <EditSctpLinkForm update={update} close={close} link={link}/>
        </BaseCreateModalForm>
    )
};

export default EditSctpLinkModal;