import React from 'react';
import CreateM3uaLinkForm from '../CreateM3uaLinkForm';
import EditM3uaLinkForm from '../EditM3uaLinkForm';
import BaseCreateModalForm from './BaseCreateModalForm';

const EditM3uaLinkModal = ({ isOpen, update, close, link }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Edit M3UA-link"}
            close={close}
            indentations={0}
            width={"modal-dialog modal-lg"}
        >
            <EditM3uaLinkForm update={update} close={close} link={link}/>
        </BaseCreateModalForm>
    )
};

export default EditM3uaLinkModal;