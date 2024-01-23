import React from 'react';

const BaseModal = (props) => {

    return (
        <>
            <div className="modal-backdrop" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1040
            }}></div>
            <div class="modal" style={{ display: 'block', zIndex: 1045 }}>
                {props.children}
            </div>
        </>
    );
};

export default BaseModal;