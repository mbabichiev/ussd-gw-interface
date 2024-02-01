import React from 'react'

const BaseLinkList = ({ nameList, table, modal, isUpdating }) => {

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
            {modal}
        </div>
    );
};

export default BaseLinkList;
