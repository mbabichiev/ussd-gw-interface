import React from 'react';

const RestartButton = (props) => {
    return (
        <button {...props} title="Restart" type="button" class="btn btn-sm btn-outline-secondary d-flex justify-content-center align-items-center">
            <svg class="bi" width="1.3em" height="1.3em" fill="none">
                <use href="#circular-arrow"></use>
            </svg>
        </button>
    );
};

export default RestartButton;