import React from 'react';

const FormInput = ({ name, errorText, ...props }) => {

    return (
        <div>
            {name ?
                <label class="form-label">{name}</label> : <></>
            }
            <input {...props} class="form-control" />
            <div class="invalid-feedback">
                {errorText}
            </div>
        </div>
    );
};

export default FormInput;