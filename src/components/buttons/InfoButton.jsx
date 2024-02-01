import React from 'react';

const InfoButton = (props) => {
    return (
        <button {...props} title="Info" type="button" class="btn btn-sm btn-outline-secondary d-flex justify-content-center align-items-center">
            <svg class="bi" width="1.3em" height="1.3em" fill="white">
                <use href="#graph"></use>
            </svg>
        </button>
    );
};

export default InfoButton;