import React from 'react';

const BaseFormInputItem = ({ input, index, remove, length, errorText }) => {

    return (
        <div class="input-group mb-2">
            {input}
            {length > 1 ?
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    onClick={() => remove(index)}>
                    <svg width="1.0em" height="1.0em" fill="currentColor">
                        <use href="#trash"></use>
                    </svg>
                </button>
                : <></>
            }
            <div class="invalid-feedback">
                {errorText}
            </div>
        </div>
    );
};

export default BaseFormInputItem;