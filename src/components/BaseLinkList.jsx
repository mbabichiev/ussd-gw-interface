import React, { useState, cloneElement } from 'react';
import Modal from './UI/Modal/Modal';

const BaseLinkList = ({ nameList, table, createButtonName, form, modal, isUpdating }) => {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    const formWithClose = cloneElement(form, { close: toggleModal });

    return (
        <div>
            <h3 className="fw-light">
                <div className="d-flex align-items-center justify-content-center">
                    {isUpdating &&
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    }
                    <span role="status">{nameList}</span>
                </div>
            </h3>
            {table}
            <button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={toggleModal}>
                <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
                {createButtonName}
            </button>
            <Modal
                isOpen={showModal}
                name={createButtonName}
                close={toggleModal}>
                {formWithClose}
            </Modal>
            {modal}
        </div>
    );
};

export default BaseLinkList;
