import React from 'react';
import BaseDiagram from '../BaseDiagram';
import BaseCreateModalForm from './BaseCreateModalForm';

const SctpLinkInfoModal = ({ isOpen, close, link }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={link.name}
            close={close}
            indentations={2}
            width={"modal-dialog modal-lg"}
        >
            <BaseDiagram link={link}/>
        </BaseCreateModalForm>
    )
};

export default SctpLinkInfoModal;