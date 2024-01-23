import React from 'react';

const StopButton = (props) => {
    return (
        <button {...props} title="Stop" type="button" class="btn btn-sm btn-outline-secondary d-flex justify-content-center align-items-center">
            <svg class="bi" width="1.3em" height="1.3em" fill="white">
                <use href="#stop"></use>
            </svg>
        </button>
    );
};

export default StopButton;