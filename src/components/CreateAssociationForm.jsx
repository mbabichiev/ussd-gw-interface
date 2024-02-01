import React, { useState } from 'react';
import { SERVER_ERROR } from '../config';
import AssociationService from '../API/AssociationService';


const CreateAssociationForm = ({ update, close, sctpLinkList, m3uaLinkList }) => {

    const [sctpLinkName, setSctpLinkName] = useState(sctpLinkList && sctpLinkList.length !== 0 ? sctpLinkList[0].name : '');
    const [m3uaLinkName, setM3uaLinkName] = useState(m3uaLinkList && m3uaLinkList.length !== 0 ? m3uaLinkList[0].name : '');

    const [classForm, setClassForm] = useState("fw-light");
    const [isCreating, setIsCreating] = useState(false);

    async function create(e) {
        e.preventDefault();
        setClassForm("fw-light was-validated")
        let sctpLink = sctpLinkList.find(link => link.name === sctpLinkName);
        let m3uaLink = m3uaLinkList.find(link => link.name === m3uaLinkName);

        if (!sctpLink || !m3uaLink) {
            return alert(SERVER_ERROR);
        }

        let sctpLinkId = sctpLink.id;
        let m3uaLinkId = m3uaLink.id;

        setIsCreating(true);
        const response = await AssociationService.create({
            "sctp-link-id": sctpLinkId,
            "m3ua-link-id": m3uaLinkId
        });

        if(response && response.status === 201) {
            await update();
            setIsCreating(false);
            close();
        } else if (response && response.status === 400) {
            setIsCreating(false);
            alert(response.data.message)
        } else {
            setIsCreating(false);
            alert(SERVER_ERROR)
        }
    }


    function getButtonCreate() {
        if (isCreating) {
            return (
                <button class="btn btn-primary btn-lg" type="button" disabled="">
                    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Creating association</span>
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
                    <label for="type" class="form-label">SCTP-link</label>
                    <select class="form-select" id="type" value={sctpLinkName} onChange={e => setSctpLinkName(e.target.value)}>
                        {sctpLinkList ? sctpLinkList.map(sctpLink => <option>{sctpLink.name}</option>) : <></>}
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="type" class="form-label">M3UA-link</label>
                    <select class="form-select" id="type" value={m3uaLinkName} onChange={e => setM3uaLinkName(e.target.value)}>
                        {m3uaLinkList ? m3uaLinkList.map(m3uaLink => <option>{m3uaLink.name}</option>) : <></>}
                    </select>
                </div>
                {getButtonCreate()}
            </div>
        </form>
    )
};

export default CreateAssociationForm;