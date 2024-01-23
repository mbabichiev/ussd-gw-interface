import React from 'react';
import AddressItem from './AddressItem';

const AddressList = ({ list, setList, buttonName }) => {

    function add() {
        setList([...list, '']);
    }

    function update(index, value) {
        const updatedList = [...list];
        updatedList[index] = value;
        setList(updatedList);
    }

    function remove(index) {
        setList(list.filter((_, idx) => idx !== index));
    }

    function getListItem() {
        return (
            list.map((value, index) => (
                <AddressItem address={value} index={index} update={update} remove={remove} length={list.length}/>
            ))
        )
    }

    return (
        <div>
            {getListItem()}
            <button onClick={add} className="btn btn-outline-secondary d-inline-flex align-items-center" type="button">
                {buttonName}
            </button>
        </div>
    )
};

export default AddressList;