import React from 'react';
import TrashButton from './buttons/TrashButton';

const AssociationItem = ({ association, deleteItem }) => {

    function deleteItemWithoutId() {
        deleteItem(association.id);
    }

    return (
        <>
            <tr class="border-bottom border-200">
                <th class="align-middle fw-light">
                    {association.sctpLink.name}
                </th>
                <th class="align-middle fw-light">
                    {association.m3uaLink.name}
                </th>
                <th class="">
                    <div class="btn-group" style={{ color: 'white' }}>
                        <TrashButton onClick={deleteItemWithoutId} />
                    </div>
                </th>
            </tr>
        </>
    )
};

export default AssociationItem;