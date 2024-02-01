import React from 'react';
import CreateShortCodeForm from '../CreateShortCodeForm';
import BaseCreateModalForm from './BaseCreateModalForm';


const CreateShortCodeModal = ({ isOpen, close }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Create short code"}
            close={close}
            indentations={0}
            width={"modal-dialog modal-lg"}
        >
            <CreateShortCodeForm/>
        </BaseCreateModalForm>
    )
};

export default CreateShortCodeModal;