import React from 'react';
import CheckingModal from './CheckingModal';

const DeleteAssociationModal = ({ isOpen, accept, close, isLoading }) => {

    return (
        <CheckingModal
            isOpen={isOpen}
            name={"Are you sure you want to delete the association?"}
            description={"If you do it, the SCTP-link will be in DOWN state"}
            yesButtonText={"Yes, I'm sure"}
            noButtonText={"No, thanks"}
            accept={accept}
            close={close}
            isLoading={isLoading}
            loadingText={"Deleting association..."}
        />
    )
};

export default DeleteAssociationModal;