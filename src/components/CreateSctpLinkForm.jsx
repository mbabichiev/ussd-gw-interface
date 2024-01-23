import React, { useState } from 'react';
import SctpLinkService from '../API/SctpLinkService';
import { SERVER_ERROR } from '../config';
import AddressList from './AddressList';
import FormInput from './FormInput';

const CreateSctpLinkForm = ({ update, close, link }) => {
    const [name, setName] = useState(link && link.name ? `${link.name}-copy`  : '');
    const [type, setType] = useState('CLIENT');
    const [localPort, setLocalPort] = useState('');
    const [localAddresses, setLocalAddresses] = useState(['']);
    const [remotePort, setRemotePort] = useState('');
    const [remoteAddresses, setRemoteAddresses] = useState(['']);
    const [heartbeat, setHeartbeat] = useState(true);
    const [activeOnStart, setActiveOnStart] = useState(true);

    const [classForm, setClassForm] = useState("fw-light");
    const [localPortError, setLocalPortError] = useState("Local port is required");
    const [remotePortError, setRemotePortError] = useState("Remote port is required");
    const [isSctpLinsCreating, setIsSctpLinsCreating] = useState(false);


    function isValidIPv4(ip) {
        const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    }


    async function create(e) {
        e.preventDefault();
        setClassForm("fw-light was-validated")
        let trimedName = name.trim();
        setName(trimedName);
        if (trimedName.length === 0) {
            return;
        }
        const arr = trimedName.split(' ');
        var resultName = name;
        if (arr.length > 1) {
            resultName = arr.join('-')
            setName(resultName);
        }

        if (!localPort || !remotePort || localPort.length === 0 || remotePort.length === 0 || localPort < 0 || remotePort < 0) {
            return;
        }

        for (let i = 0; i < localAddresses.length; i++) {
            if (localAddresses[i].length === 0 || isValidIPv4(localAddresses[i]) === false) {
                return;
            }
        }

        for (let i = 0; i < remoteAddresses.length; i++) {
            if (remoteAddresses[i].length === 0 || isValidIPv4(remoteAddresses[i]) === false) {
                return;
            }
        }

        setIsSctpLinsCreating(true);
        const response = await SctpLinkService.create({
            "name": resultName,
            "type": type,
            "local-addresses": localAddresses,
            "local-port": localPort,
            "remote-addresses": remoteAddresses,
            "remote-port": remotePort,
            "active-on-start": activeOnStart,
            "is-heartbeat-enabled": heartbeat
        });

        if(response && response.status === 201) {
            await update();
            setIsSctpLinsCreating(false);
            close();
        } else if (response && response.status === 400) {
            setIsSctpLinsCreating(false);
            alert(response.data.message)
        } else {
            setIsSctpLinsCreating(false);
            alert(SERVER_ERROR)
        }
    }


    function changeLocalPort(value) {
        setLocalPort(value);
        if (!value || value.length === 0) {
            setLocalPortError("Local port is required");
        }
        else if (value < 0) {
            setLocalPortError("Value shold be more than -1");
        }
    }


    function changeRemotePort(value) {
        setRemotePort(value);
        if (!value || value.length === 0) {
            setRemotePortError("Remote port is required");
        }
        else if (value < 0) {
            setRemotePortError("Value shold be more than -1");
        }
    }


    function getButtonCreate() {
        if (isSctpLinsCreating) {
            return (
                <button class="btn btn-primary btn-lg" type="button" disabled="">
                    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Creating SCTP-link...</span>
                </button>
            )
        }
        return (
            <button class="btn btn-primary btn-lg" onClick={create}>Create</button>
        )
    }


    return (
        <form class={classForm}>
            <div class="row g-3">
                <div class="col-sm-6">
                    <FormInput
                        name="Name"
                        errorText={"Name is required"}
                        id="sctp-link-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="STP-1-1"
                        required
                    />
                </div>
                <div class="col-md-6">
                    <label for="type" class="form-label">Type</label>
                    <select class="form-select" id="type" value={type} onChange={e => setType(e.target.value)}>
                        <option value="">CLIENT</option>
                        <option>SERVER</option>
                    </select>
                </div>
                <div class="col-sm-6">
                    <label className="form-label">Local addresses</label>
                    <AddressList list={localAddresses} setList={setLocalAddresses} buttonName="Add local address" />
                </div>
                <div class="col-sm-6">
                    <label className="form-label">Remote addresses</label>
                    <AddressList list={remoteAddresses} setList={setRemoteAddresses} buttonName="Add remote address" />
                </div>
                <div class="col-sm-6">
                    <FormInput
                        name="Local port"
                        errorText={localPortError}
                        id="local-port"
                        value={localPort}
                        onChange={e => changeLocalPort(e.target.value)}
                        placeholder="2905"
                        type="number"
                        min="0"
                        required
                    />
                </div>
                <div class="col-sm-6">
                    <FormInput
                        name="Remote port"
                        errorText={remotePortError}
                        id="remote-port"
                        value={remotePort}
                        onChange={e => changeRemotePort(e.target.value)}
                        placeholder="2906"
                        type="number"
                        min="0"
                        required
                    />
                </div>

                <div class="col-sm-6">
                    <div class="form-check">
                        <input checked={heartbeat} onChange={e => setHeartbeat(e.target.checked)} type="checkbox" class="form-check-input" id="heartbeat" />
                        <label for="heartbeat">Is heartbeat enabled</label>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-check">
                        <input checked={activeOnStart} onChange={e => setActiveOnStart(e.target.checked)} type="checkbox" class="form-check-input" id="active-on-start" />
                        <label for="active-on-start">Active on start</label>
                    </div>
                </div>
                {getButtonCreate()}
            </div>
        </form>
    )
};

export default CreateSctpLinkForm;