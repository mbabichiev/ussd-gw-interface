import React from 'react';
import CreateM3uaLinkForm from '../CreateM3uaLinkForm';
import BaseCreateModalForm from './BaseCreateModalForm';

const CreateM3uaLinkModal = ({ isOpen, update, close, link }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Create M3UA-link"}
            close={close}
            indentations={0}
            width={"modal-dialog modal-lg"}
        >
            <CreateM3uaLinkForm update={update} close={close} link={link}/>
        </BaseCreateModalForm>
    )
};

export default CreateM3uaLinkModal;