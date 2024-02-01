import React, { useState } from 'react';
import CreateRoutingRuleModal from './modals/CreateRoutingRuleModal';

const RoutingRulesList = ({ rules }) => {

    const [isModalShow, setIsModalShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentId, setCurrentId] = useState('');

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


    function getModal() {
        if (modalType === "CREATE") {
            return <CreateRoutingRuleModal isOpen={isModalShow} close={toggleModal}/>
        }
    }


    return (
        <div>
            <h3 className="fw-light">
                <div className="d-flex align-items-center justify-content-center">
                    <span role="status">Routing rules</span>
                </div>
            </h3>
            <div className='text-center'>
                <button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={() => showModalAndSetIdAndType(null, "CREATE")}>
                    <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
                    Add rule
                </button>
            </div>
            {getModal()}
        </div>
    );
};

export default RoutingRulesList;