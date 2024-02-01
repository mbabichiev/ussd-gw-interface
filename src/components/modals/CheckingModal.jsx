import React from 'react';
import BaseModal from './BaseModal';

const CheckingModal = ({ isOpen, name, description, yesButtonText, noButtonText, accept, close, isLoading, loadingText }) => {

    if (isOpen === false) {
        return;
    }

    function getButtons() {
        if (isLoading) {
            return (
                <div class="modal-footer flex-column align-items-stretch p-0">
                    <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none py-3 m-0 rounded-0" disabled="">
                        <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        <span role="status">{loadingText}</span>
                    </button>
                </div>
            )
        }
        return (
            <div class="modal-footer flex-nowrap p-0">
                <button type="button" onClick={accept} class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end">
                    <strong>{yesButtonText}</strong>
                </button>
                <button type="button" onClick={close} class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0">
                    {noButtonText}
                </button>
            </div>
        )
    }

    return (
        <BaseModal>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <div class="modal-dialog">
                <div class="modal-content rounded-4 shadow">
                    <div class="modal-body p-4 text-center">
                        <h5 class="mb-0">{name}</h5>
                        <p class="mb-0">{description}</p>
                    </div>
                    {getButtons()}
                </div>
            </div>
        </BaseModal>
    )
};

export default CheckingModal;