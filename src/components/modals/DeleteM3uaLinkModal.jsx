import React from 'react';
import CheckingModal from './CheckingModal';

const DeleteM3uaLinkModal = ({ isOpen, accept, close, isLoading }) => {

    return (
        <CheckingModal
            isOpen={isOpen}
            name={"Are you sure you want to delete the M3UA-link?"}
            description={"If you do this, all SCTP links associated with this M3UA link will be in DOWN status, and consequently, you will lose all the traffic that is currently going through these links. Also, all corresponding associations will be removed."}
            yesButtonText={"Yes, I'm sure"}
            noButtonText={"No, thanks"}
            accept={accept}
            close={close}
            isLoading={isLoading}
            loadingText={"Deleting M3UA link..."}
        />
    )
};

export default DeleteM3uaLinkModal;