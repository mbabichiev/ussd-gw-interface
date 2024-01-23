import React, { useState } from 'react';
import M3uaLinkService from '../API/M3uaLinksService';
import { SERVER_ERROR } from '../config';
import FormInput from './FormInput';
import SsnList from './SsnList';

const CreateM3uaLinkForm = ({ update, close }) => {
    const [name, setName] = useState('');
    const [ipspType, setIpspType] = useState('CLIENT');
    const [opc, setOpc] = useState('');
    const [dpc, setDpc] = useState('');
    const [ssn, setSsn] = useState([6, 8, 147]);
    const [functionality, setFunctionality] = useState('IPSP');
    const [networkIndicator, setNetworkIndicator] = useState(0);
    const [routingContext, setRoutingContext] = useState('');
    const [networkAppearance, setNetworkAppearance] = useState('');
    const [exchangeType, setExchangeType] = useState('SE');
    const [trafficMode, setTrafficMode] = useState('LOADSHARED');
    const [longMessageRule, setLongMessageRule] = useState('XUDT');


    const [classForm, setClassForm] = useState("fw-light");
    const [isM3uaLinsCreating, setIsM3uaLinsCreating] = useState(false);

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

        console.log(networkIndicator === '')

        if (!opc || opc.length === 0 || !dpc || dpc.length === 0 || networkIndicator === '') {
            return;
        }

        for (let i = 0; i < ssn.length; i++) {
            if (!ssn[i] || ssn[i].length === 0) {
                return;
            }
        }

        setIsM3uaLinsCreating(true);
        const response = await M3uaLinkService.create({
            "name": resultName,
            "opc": opc,
            "dpc": dpc,
            "ssn": ssn,
            "functionality": functionality,
            "ipsp-type": ipspType,
            "network-indicator": networkIndicator,
            "routing-context": routingContext === '' ? null : routingContext,
            "network-appearance": networkAppearance === '' ? null : networkAppearance,
            "exchange-type": exchangeType,
            "traffic-mode": trafficMode,
            "long-message-rule": longMessageRule
        });

        if (response && response.status === 201) {
            await update();
            setIsM3uaLinsCreating(false);
            close();
        } else if (response && response.status === 400) {
            setIsM3uaLinsCreating(false);
            alert(response.data.message)
        } else {
            setIsM3uaLinsCreating(false);
            alert(SERVER_ERROR)
        }
    }


    function getButtonCreate() {
        if (isM3uaLinsCreating) {
            return (
                <button class="btn btn-primary btn-lg" type="button" disabled="">
                    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Creating M3UA-link...</span>
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

                <div class="col-md-6">
                    <FormInput
                        name="Name"
                        errorText={"Name is required"}
                        id="m3ua-link-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="AS-1"
                        required
                    />
                </div>
                <div class="col-md-6">
                    <label for="type" class="form-label">Type</label>
                    <select class="form-select" id="type" value={ipspType} onChange={e => setIpspType(e.target.value)}>
                        <option value="">CLIENT</option>
                        <option>SERVER</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <div class="row gy-2">
                        <div class="col-md-6">
                            <FormInput
                                name="OPC"
                                errorText={"OPC is required"}
                                id="opc"
                                value={opc}
                                onChange={e => setOpc(e.target.value)}
                                placeholder="100"
                                type="number"
                                required
                            />
                        </div>
                        <div class="col-md-6">
                            <FormInput
                                name="DPC"
                                errorText={"DPC is required"}
                                id="dpc"
                                value={dpc}
                                onChange={e => setDpc(e.target.value)}
                                placeholder="101"
                                type="number"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-md-12" style={{ marginTop: '15px' }}>
                        <label for="type" class="form-label">Traffic mode</label>
                        <select class="form-select" id="traffic-mode" value={trafficMode} onChange={e => setTrafficMode(e.target.value)}>
                            <option value="">LOADSHARED</option>
                            <option>OVERRIDE</option>
                            <option>BROADCAST</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="type" class="form-label">SSN</label>
                    <SsnList list={ssn} setList={setSsn} buttonName="Add SSN" />
                </div>

                <div class="col-md-4">
                    <FormInput
                        name="Network indicator"
                        errorText={"Network indicator is required"}
                        id="network-indicator"
                        value={networkIndicator}
                        onChange={e => setNetworkIndicator(e.target.value)}
                        placeholder="0"
                        type="number"
                        required
                    />
                </div>
                <div class="col-md-4">
                    <FormInput
                        name="Routing context (optional)"
                        id="routing-context"
                        value={routingContext}
                        onChange={e => setRoutingContext(e.target.value)}
                        placeholder="0"
                        type="number"
                    />
                </div>
                <div class="col-md-4">
                    <FormInput
                        name="Network appearance (optional)"
                        id="network-appearance"
                        value={networkAppearance}
                        onChange={e => setNetworkAppearance(e.target.value)}
                        placeholder="0"
                        type="number"
                    />
                </div>

                <div class="col-md-4">
                    <label for="type" class="form-label">Exchange type</label>
                    <select class="form-select" id="exchange-type" value={exchangeType} onChange={e => setExchangeType(e.target.value)}>
                        <option value="">SE</option>
                        <option>DE</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="type" class="form-label">Functionality</label>
                    <select class="form-select" id="functionality" value={functionality} onChange={e => setFunctionality(e.target.value)}>
                        <option value="">IPSP</option>
                        <option value="">AS</option>
                        <option>SGW</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="type" class="form-label">Long message rule</label>
                    <select class="form-select" id="long-message-rule" value={longMessageRule} onChange={e => setLongMessageRule(e.target.value)}>
                        <option value="">XUDT</option>
                        <option>UDT</option>
                        <option>LUDT</option>
                        <option>LUDT-SEGM</option>
                    </select>
                </div>

                {getButtonCreate()}
            </div>
        </form>
    )
};

export default CreateM3uaLinkForm;