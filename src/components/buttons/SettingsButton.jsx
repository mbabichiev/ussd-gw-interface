import React from 'react';

const SettingsButton = () => {
    return (
        <button title="Edit" type="button" class="btn btn-sm btn-outline-secondary d-flex justify-content-center align-items-center">
            <svg class="bi" width="1.3em" height="1.3em" fill="white">
                <use href="#gear-fill"></use>
            </svg>
        </button>
    );
};

export default SettingsButton;