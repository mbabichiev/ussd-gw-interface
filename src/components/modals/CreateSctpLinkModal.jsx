import React from 'react';
import CreateSctpLinkForm from '../CreateSctpLinkForm';
import BaseCreateModalForm from './BaseCreateModalForm';

const CreateSctpLinkModal = ({ isOpen, update, close, link }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Create SCTP-link"}
            close={close}
            indentations={2}
            width={"modal-dialog"}
        >
            <CreateSctpLinkForm update={update} close={close} link={link}/>
        </BaseCreateModalForm>
    )
};

export default CreateSctpLinkModal;