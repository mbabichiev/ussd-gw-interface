import React from 'react';
import CreateRoutingRuleForm from '../CreateRoutingRuleForm';
import BaseCreateModalForm from './BaseCreateModalForm';

const CreateRoutingRuleModal = ({ isOpen, update, close, rule }) => {

    return (
        <BaseCreateModalForm
            isOpen={isOpen}
            name={"Create routing rule"}
            close={close}
            indentations={0}
            width={"modal-dialog modal-lg"}
        >
            <CreateRoutingRuleForm/>
        </BaseCreateModalForm>
    )
};

export default CreateRoutingRuleModal;