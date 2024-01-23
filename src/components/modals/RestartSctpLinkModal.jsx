import React from 'react';
import CheckingModal from './CheckingModal';

const RestartSctpLinkModal = ({ isOpen, accept, close, isLoading }) => {
    
    return (
        <CheckingModal
            isOpen={isOpen}
            name={"Are you sure you want to restart the SCTP-link?"}
            description={"If you do it, the traffic using this link will be paused on some time"}
            yesButtonText={"Yes, I'm sure"}
            noButtonText={"No, thanks"}
            accept={accept}
            close={close}
            isLoading={isLoading}
            loadingText={"Restarting SCTP-link..."}
        />
    )
};

export default RestartSctpLinkModal;