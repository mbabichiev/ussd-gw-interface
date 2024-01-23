import React from 'react';
import CheckingModal from './CheckingModal';

const StopSctpLinkModal = ({ isOpen, accept, close, isLoading }) => {

    return (
        <CheckingModal
            isOpen={isOpen}
            name={"Are you sure you want to stop the SCTP-link?"}
            description={"If you do it, the traffic using this link will be stopped"}
            yesButtonText={"Yes, I'm sure"}
            noButtonText={"No, thanks"}
            accept={accept}
            close={close}
            isLoading={isLoading}
            loadingText={"Stopping SCTP-link..."}
        />
    )
};

export default StopSctpLinkModal;