import React, { useState } from 'react';
import BaseFormInputItem from './BaseFormInputItem';

const SsnItem = ({ ssn, index, update, remove, length }) => {

    const [errorText, setErrorText] = useState("SSN is required");

    function updateSsn(index, value) {
        update(index, value);
        if (!value || value.length === 0) {
            setErrorText("SSN is required");
        }
        else if (value < 0) {
            setErrorText("SSN is invalid")
        }
    }

    function getInput() {
        return <input
            key={index}
            type="number"
            min="1"
            className="form-control"
            placeholder="6"
            id="ssn"
            title="Enter valid Subsystem number. It should be more than 0"
            value={ssn}
            onChange={e => updateSsn(index, e.target.value)}
            required
        />
    }

    return (
        <BaseFormInputItem
            input={getInput()}
            index={index}
            remove={remove}
            length={length}
            errorText={errorText}
        />
    )
};

export default SsnItem;