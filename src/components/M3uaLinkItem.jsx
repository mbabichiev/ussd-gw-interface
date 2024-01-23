import React from 'react';
import SettingsButton from './buttons/SettingsButton';
import TrashButton from './buttons/TrashButton';

const M3uaLinkItem = ({ link }) => {

    function getLinkState() {
        const state = link["status"] == null ? "DOWN" : link["status"];
        let color;
        if (state === "ACTIVE") {
            color = "green"
        }
        else if (state === "DOWN") {
            color = "red"
        }
        else {
            color = "yellow"
        }
        const style = { color: color };
        return <div style={style}>{state}</div>;
    }

    function formatSSN(ssnArray) {
        return "[" + ssnArray.join(', ') + "]";
    }

    return (

        <tr class="border-bottom border-200">
            <th class="align-middle fw-light">
                {link.name}
            </th>
            <th class="align-middle fw-light">
                {link["ipsp-type"]}
            </th>
            <th class="align-middle fw-light">
                {link.opc}
            </th>
            <th class="align-middle fw-light">
                {link.dpc}
            </th>
            <th class="align-middle fw-light">
                {formatSSN(link.ssn)}
            </th>
            <th class="align-middle fw-light">
                {link.functionality}
            </th>
            <th class="align-middle fw-light">
                {link["network-indicator"]}
            </th>
            <th class="align-middle fw-light">
                {link["routing-context"] ? link["routing-context"] : "-"}
            </th>
            <th class="align-middle fw-light">
                {link["network-appearance"] ? link["network-appearance"] : "-"}
            </th>
            <th class="align-middle fw-light">
                {link["long-message-rule"]}
            </th>
            <th class="align-middle">
                {getLinkState()}
            </th>
            <th class="align-middle">
                <div class="btn-group" style={{ color: 'white' }}>
                    <SettingsButton />
                    <TrashButton />
                </div>
            </th>
        </tr>

    )
};

export default M3uaLinkItem;