import React from 'react';

const FormText = ({ name, errorText, ...props }) => {

    return (
        <div>
            {name ?
                <label class="form-label">{name}</label> : <></>
            }
            <textarea {...props} class="form-control">
            </textarea>
            <div class="invalid-feedback">
                {errorText}
            </div>
        </div>
    );
};

export default FormText;