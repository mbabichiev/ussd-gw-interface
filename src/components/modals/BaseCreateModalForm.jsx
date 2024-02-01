import React from 'react';
import BaseModal from './BaseModal';

const BaseCreateModalForm = ({ isOpen, name, close, children, indentations, width }) => {

    if (isOpen === false) {
        return;
    }

    function getIndentations() {
        if(!indentations) {
            return null;
        }
    
        const result = [];
        for(let i = 0; i < indentations; i++) {
            result.push(<br key={i} />);
        }
    
        return result;
    }


    return (
        <BaseModal>
            {getIndentations()}
            <div class={`${width}`}>
                <div class="modal-content rounded-4 shadow">
                    <div className="modal-header p-4 border-bottom-0">
                        <h3 className="fw-light">{name}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={close} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4 pt-0">
                        {children}
                    </div>
                </div>
            </div>
        </BaseModal>
    )
};

export default BaseCreateModalForm;