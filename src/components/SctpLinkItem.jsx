import React from 'react';
import CopyButton from './buttons/CopyButton';
import RestartButton from './buttons/RestartButton';
import SettingsButton from './buttons/SettingsButton';
import StartButton from './buttons/StartButton';
import StopButton from './buttons/StopButton';
import TrashButton from './buttons/TrashButton';

const SctpLinkItem = ({ link, startItem, restartItem, stopItem, deleteItem, copyItem }) => {

    function getLinkState() {
        const state = link["status"] == null ? "DOWN" : link["status"];
        const style = { color: state === "ACTIVE" ? "green" : "red" };
        return <div style={style}>{state}</div>;
    }

    function formatAddresses(addresses) {
        return addresses.map(address => <>{address}<br/></>)
    }

    function startLink() {
        startItem(link.id);
    }

    function restartLink() {
        restartItem(link.id);
    } 

    function stopLink() {
        stopItem(link.id);
    }

    function deleteLink() {
        deleteItem(link.id);
    }

    function copyLink() {
        copyItem(link);
    }

    function getStartStopButtons() {
        if (link["active-on-start"]) {
            return <>
                <StopButton onClick={stopLink}/>
                <RestartButton onClick={restartLink}/>
            </>
        }

        return <StartButton onClick={startLink}/>
    }

    return (
        <tr class="border-bottom border-200">
            <th class="align-middle fw-light">
                {link.name}
            </th>
            <th class="align-middle fw-light">
                {link.type.toUpperCase()}
            </th>
            <th class="align-middle fw-light">
                {formatAddresses(link["local-addresses"])}
            </th>
            <th class="align-middle fw-light">
                {link["local-port"]}
            </th>
            <th class="align-middle fw-light">
                {formatAddresses(link["remote-addresses"])}
            </th>
            <th class="align-middle fw-light">
                {link["remote-port"]}
            </th>
            <th class="align-middle">
                {getLinkState()}
            </th>
            <th class="align-middle">
                <div class="btn-group" style={{ color: 'white' }}>
                    {getStartStopButtons()}
                    <CopyButton onClick={copyLink}/>
                    <SettingsButton/>
                    <TrashButton onClick={deleteLink}/>
                </div>
            </th>
        </tr>
    )
};

export default SctpLinkItem;