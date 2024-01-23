import React from 'react';
import CheckingModal from './CheckingModal';

const DeleteSctpLinkModal = ({ isOpen, accept, close, isLoading }) => {

    return (
        <CheckingModal
            isOpen={isOpen}
            name={"Are you sure you want to delete the SCTP-link?"}
            description={"If you do this, you will lose the traffic that is going through this link. Also, the association with the M3UA link will be removed."}
            yesButtonText={"Yes, I'm sure"}
            noButtonText={"No, thanks"}
            accept={accept}
            close={close}
            isLoading={isLoading}
            loadingText={"Deleting SCTP link..."}
        />
    )
};

export default DeleteSctpLinkModal;