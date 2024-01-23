import React, { useState } from 'react';
import BaseFormInputItem from './BaseFormInputItem';

const AddressItem = ({ address, index, update, remove, length }) => {

    const [addressError, setAddressError] = useState("Address is required");

    function isValidIPv4(ip) {
        const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    }

    function updateAddress(index, value) {
        update(index, value);
        if (!value || value.length === 0) {
            setAddressError("Address is required");
        }
        else if (isValidIPv4(value) === false) {
            setAddressError("Address is invalid")
        }
    }

    function getInput() {
        return <input
            key={index}
            type="text"
            className="form-control"
            placeholder="127.0.0.1"
            id="sctp-link-address"
            pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
            title="Enter valid IP-address. For example, 192.168.1.1"
            value={address}
            onChange={e => updateAddress(index, e.target.value)}
            required
        />
    }

    return (
        <BaseFormInputItem
            input={getInput()}
            index={index}
            remove={remove}
            length={length}
            errorText={addressError}
        />
    )
};

export default AddressItem;