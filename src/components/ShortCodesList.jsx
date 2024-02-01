import React, { useState } from 'react';
import BaseLinkList from './BaseLinkList';
import CreateSctpLinkModal from './modals/CreateSctpLinkModal';
import CreateShortCodeModal from './modals/CreateShortCodeModal';


const ShortCodesList = ({ shortCodesList, updateList, isUpdating }) => {

    const [isModalShow, setIsModalShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function toggleModal() {
        setIsModalShow(!isModalShow);
    }

    function showModalAndSetIdAndType(id, type) {
        toggleModal();
        if (id) {
            setCurrentId(id);
        }
        setModalType(type);
    }

    function addLinkButton() {
        return (<button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={() => showModalAndSetIdAndType(null, "CREATE")}>
            <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
            Add short code
        </button>
        )
    }

    function getModal() {
        if (modalType === "DELETE") {
            return;
        }
        if (modalType === "CREATE") {
            return <CreateShortCodeModal isOpen={isModalShow} close={toggleModal} />
        }
        if (modalType === "COPY") {
            return;
        }
        if (modalType === "EDIT") {
            return;
        }
        return;
    }


    function loadShortCodes() {
        return (
            <>
                {addLinkButton()}
            </>
        )
    }


    return (
        <BaseLinkList
            nameList="Short codes"
            table={loadShortCodes()}
            isUpdating={isUpdating}
            modal={getModal()}
        />
    )
};

export default ShortCodesList;