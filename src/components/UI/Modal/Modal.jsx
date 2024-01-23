import React from 'react';

const Modal = (props) => {
    if (props.isOpen === false) {
        return null;
    }

    return (
        <>
            <div className="modal-backdrop" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1040
            }}></div>

            <div className="modal" style={{ display: 'block', zIndex: 1045 }}>
                <div className="container px-5 py-4">
                    <div className="container px-5">
                        <div className="container px-5">
                            <div className="container px-5">
                                <div className="modal-content rounded-4 shadow">
                                    <div className="modal-header p-4 border-bottom-0">
                                        <h3 className="fw-light">{props.name}</h3>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={props.close} aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body p-4 pt-0">
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;