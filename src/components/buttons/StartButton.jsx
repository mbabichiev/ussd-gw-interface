import React from 'react';

const StartButton = (props) => {
    return (
        <button {...props} title="Start" type="button" class="btn btn-sm btn-outline-secondary d-flex justify-content-center align-items-center">
            <svg class="bi" width="1.3em" height="1.3em" fill="white">
                <use href="#start"></use>
            </svg>
        </button>
    );
};

export default StartButton;