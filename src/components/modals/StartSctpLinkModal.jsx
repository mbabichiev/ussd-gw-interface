import React from 'react';
import CheckingModal from './CheckingModal';

const StartSctpLinkModal = ({ isOpen, accept, close, isLoading }) => {

    return (
        <CheckingModal
            isOpen={isOpen}
            name={"Are you sure you want to start the SCTP-link?"}
            description={"If you do it, some traffic can use this link"}
            yesButtonText={"Yes, I'm sure"}
            noButtonText={"No, thanks"}
            accept={accept}
            close={close}
            isLoading={isLoading}
            loadingText={"Starting SCTP-link..."}
        />
    )
};

export default StartSctpLinkModal;