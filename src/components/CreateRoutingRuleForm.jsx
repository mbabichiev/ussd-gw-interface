import React, { useState } from 'react';
import FormattedText from './FormattedText';
import FormInput from './FormInput';
import FormText from './FormText';


const Condition = ({ variables, isFirst, isLast, value, placeholder, create, selectWidth }) => {
    let start = "ELSE IF";
    if (isFirst) {
        start = "IF";
    }
    if (isLast) {
        start = "ELSE";
    }
    let w = selectWidth ? selectWidth : '70px';

    return (
        <>
            <div class="col-md-12 d-flex align-items-center">
                <div class="align-self-center">{start}&nbsp;</div>
                {!isLast
                    ?
                    <>
                        {value ? <div class="align-self-center" style={{ color: '#90EE90' }}>{value}</div> : <></>}
                        {variables ?
                            <select class="form-select mx-2" id="request-type" style={{ width: w}}>
                                {variables.map((variable) => (
                                    <option>{variable}</option>
                                ))}
                            </select>
                            : <></>
                        }
                        <select class="form-select mx-2" id="request-type" style={{ width: '70px' }}>
                            <option>==</option>
                            <option>!=</option>
                            <option>&lt;</option>
                            <option>&gt;</option>
                            <option>&gt;=</option>
                            <option>&lt;=</option>
                        </select>
                        <FormInput
                            style={{ width: '150px' }}
                            placeholder={placeholder}
                            required
                        />
                    </>
                    : <></>}
            </div>
            <div>
                <FormText />
            </div>
        </>
    )
}

const Conditions = ({ array }) => {
    const [list, setList] = useState([]);

    function create(index) {
        const newList = [...list];
        newList.splice(index + 1, 0, 'Новый элемент');
        setList(newList);
    }

    return (
        <>
            <Condition isFirst={true} value={"Status code"} placeholder={"200"} />
            {list.map((l, index) => (
                <Condition key={index} selectWidth={'140px'} variables={array} create={() => create(index)} />
            ))}
            {
                list.length === 0
                    ?
                    <button className="btn btn-outline-secondary d-inline-flex align-items-center" type="button" onClick={() => create(-1)}>
                        <svg className="me-2" width="1.3em" height="1.3em" fill="currentColor"><use href="#add"></use></svg>
                        Add condition
                    </button>

                    : null}
            <Condition isLast={true} />
        </>
    )
};


const CreateRoutingRuleForm = ({ update, close, link }) => {
    const [shortCode, setShortCode] = useState('');
    const [requestType, setRequestType] = useState('HTTP');
    const [httpMethod, setHttpMethod] = useState("GET");
    const [httpPostFormat, setHttpPostFormat] = useState("JSON");
    const [httpUrl, setHttpUrl] = useState('');
    const [timeout, setTimeout] = useState('');
    const [httpParams, setHttpParams] = useState('');
    const [httpRequestBody, setHttpRequestBody] = useState('');
    const [httpResponseFormat, setHttpResponseFormat] = useState('JSON');
    const [httpResponseText, setHttpResponseText] = useState('');
    const [httpResponseBody, setHttpResponseBody] = useState('');

    const [classForm, setClassForm] = useState("fw-light");
    const [heightRequestText, setRequestHeightText] = useState(2);
    const [heightResponseText, setResponseHeightText] = useState(3);
    const [isRoutingRuleCreating, setIsRoutingRuleCreating] = useState(false);

    function create(e) {
        e.preventDefault();
        setClassForm("fw-light was-validated")
    }


    function getButtonCreate() {
        if (isRoutingRuleCreating) {
            return (
                <button class="btn btn-primary btn-lg" type="button" disabled="">
                    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Creating routing rule...</span>
                </button>
            )
        }
        return (
            <button class="btn btn-primary btn-lg" onClick={create}>Create</button>
        )
    }

    function getHttpMapInputs() {
        if (requestType === "HTTP") {
            let httpMethodInput = (
                <div class="col-md-3">
                    <label for="request-type" class="form-label">HTTP method</label>
                    <select class="form-select" id="request-type" value={httpMethod} onChange={e => setHttpMethod(e.target.value)}>
                        <option>GET</option>
                        <option>POST</option>
                    </select>
                </div>
            )
            let timeoutData = (
                <div class="col-md-3">
                    <FormInput
                        name="Timeout"
                        errorText={"Timeout is required"}
                        id="timeout"
                        value={timeout}
                        onChange={e => setTimeout(e.target.value)}
                        placeholder="5000"
                        required
                    />
                </div>
            )
            let httpPostData = (
                <div class="col-md-3">
                    <label for="request-type" class="form-label">HTTP format</label>
                    <select class="form-select" id="request-type" value={httpPostFormat} onChange={e => setHttpPostFormat(e.target.value)}>
                        <option>JSON</option>
                        <option>XML</option>
                    </select>
                </div>
            )
            let emptyBlock = (
                <div class="col-md-3">
                </div>
            )
            return (
                <>
                    {timeoutData}
                    {httpMethodInput}
                    {
                        httpMethod === "POST" ?
                            httpPostData :
                            emptyBlock
                    }
                </>
            )
        } else {
            return (
                <div class="col-md-8">
                </div>
            )
        }
    }

    function getUrl() {
        return (
            <div class="col-md-12">
                <FormInput
                    name="Url"
                    errorText={"Url is required"}
                    id="url"
                    value={httpUrl}
                    onChange={e => setHttpUrl(e.target.value)}
                    placeholder="http://127.0.0.1:8080/request"
                    required
                />
            </div>
        )

    }

    function getHttpRequestData() {
        if (requestType !== "HTTP") {
            return;
        }

        let result;
        if (httpUrl.length !== 0 && httpParams.length !== 0) {
            result = (
                <div>
                    Result of HTTP request: <strong style={{ color: "#90EE90" }}>
                        <FormattedText text={httpUrl + httpParams} />
                    </strong>
                </div>
            )
        }
        if (httpMethod === "GET") {
            return (
                <>
                    <div class="col-md-12">
                        <FormInput
                            name="Params"
                            errorText={"Url is required"}
                            id="params"
                            value={httpParams}
                            onChange={e => setHttpParams(e.target.value)}
                            placeholder="/msisdn={MSISDN}&sc={SHORTCODE}&did={DIALOGID}"
                        />
                    </div>
                    <div class="col-md-12">
                        <div>{result}</div>
                    </div>
                </>
            )
        } else {
            let placeholderBody;
            if (httpPostFormat === "JSON") {
                placeholderBody = "{\n}"
            } else {
                placeholderBody = "<></>"
            }
            return (
                <div class="col-md-12">
                    <FormText
                        name="HTTP Body"
                        id="http-body"
                        value={httpRequestBody}
                        style={{ height: heightRequestText * 24.1 + 10 + "px" }}
                        onChange={e => {
                            setHttpRequestBody(e.target.value);
                            setRequestHeightText(e.target.value.split('\n').length);
                        }}
                        placeholder={placeholderBody}
                    />
                </div>
            )
        }
    }

    function getResponseHttpFormat() {
        return (
            <div class="col-md-4">
                <label for="response-type" class="form-label">Expected HTTP format</label>
                <select class="form-select" id="response-type" value={httpResponseFormat} onChange={e => setHttpResponseFormat(e.target.value)}>
                    <option>JSON</option>
                    <option>XML</option>
                    <option>Text</option>
                    <option>No response</option>
                </select>
            </div>
        )
    }

    function getResponseBodyText() {
        if (httpResponseFormat === "No response") {
            return;
        }

        let input;
        let variables;
        let variablesArray = [];

        if (httpResponseFormat === "Text") {
            input = (
                <div class="col-md-12">
                    <FormInput
                        name="Expected response text"
                        id="http-response-text"
                        value={httpResponseText}
                        onChange={e => setHttpResponseText(e.target.value)}
                        placeholder="ussd_text={USSD_TEXT}"
                    />
                </div>
            )
            if (httpResponseText.length !== 0) {
                const regex = /{([a-zA-Z]+)}/g;
                let match;
                while ((match = regex.exec(httpResponseText)) !== null) {
                    if (!variablesArray.includes(match[1])) {
                        variablesArray.push(match[1]);
                    }
                }
                if (variablesArray.length === 0) {
                    variables = (
                        <div className="col-md-12">
                            No variables
                        </div>
                    )
                }
                else {
                    variables = (
                        <div className="col-md-12">
                            Variables:
                            <ul style={{ color: "#90EE90" }}>
                                {variablesArray.map((variable, index) => (
                                    <li key={index}>{variable}</li>
                                ))}
                            </ul>
                        </div>
                    )
                };
            }
        } else if (httpResponseFormat === "JSON" || httpResponseFormat === "XML") {
            let placeholderBody;
            if (httpResponseFormat === "JSON") {
                placeholderBody = `{\n\t"ussd_text":"Balance: {BALANCE}"\n}`
            } else {
                placeholderBody = "<ussd_text>Balance: {BALANCE}</ussd_text>"
            }
            input = (
                <div class="col-md-12">
                    <FormText
                        name="Expected response body"
                        id="http-response-body"
                        value={httpResponseBody}
                        style={{ height: heightResponseText * 24.1 + 20 + "px" }}
                        onChange={e => {
                            setHttpResponseBody(e.target.value);
                            setResponseHeightText(e.target.value.split('\n').length);
                        }}
                        placeholder={placeholderBody}
                    />
                </div>
            )
            if (httpResponseBody.length !== 0) {
                const regex = /{([a-zA-Z]+)}/g;
                let match;
                while ((match = regex.exec(httpResponseBody)) !== null) {
                    if (!variablesArray.includes(match[1])) {
                        variablesArray.push(match[1]);
                    }
                }
                if (variablesArray.length === 0) {
                    variables = (
                        <div className="col-md-12">
                            No variables
                        </div>
                    )
                }
                else {
                    variables = (
                        <div className="col-md-12">
                            Variables:
                            <ul style={{ color: "#90EE90" }}>
                                {variablesArray.map((variable, index) => (
                                    <li key={index}>{variable}</li>
                                ))}
                            </ul>
                        </div>
                    )
                };
            }
        }

        return (
            <>
                {input}
                {variables}
            </>
        )
    }

    function getConditions() {
        let variablesArray = [];
        const regex = /{([a-zA-Z]+)}/g;
        let match;
        while ((match = regex.exec(httpResponseBody)) !== null) {
            if (!variablesArray.includes(match[1])) {
                variablesArray.push(match[1]);
            }
        }
        return <Conditions array={variablesArray} />;
    }

    function getRequest() {
        return (
            <>
                {getHttpMapInputs()}
                {getUrl()}
                {getHttpRequestData()}
            </>
        )
    }

    function getResponse() {
        return (
            <>
                {getResponseHttpFormat()}
                {getResponseBodyText()}
            </>
        )
    }


    return (
        <form class={classForm}>
            <div class="row g-3">

                <div class="col-md-12">
                    <FormInput
                        name="Short code"
                        errorText={"Short code is required"}
                        id="shortCode"
                        value={shortCode}
                        onChange={e => setShortCode(e.target.value)}
                        placeholder="*100#"
                        required
                    />
                </div>
                <hr class="my-4"></hr>
                <div class="text-center">
                    <h2>Request</h2>
                </div>
                <div class="col-md-3">
                    <label for="request-type" class="form-label">Request type</label>
                    <select class="form-select" id="request-type" value={requestType} onChange={e => setRequestType(e.target.value)}>
                        <option>HTTP</option>
                        <option>MAP</option>
                        <option>No request</option>
                    </select>
                </div>
                {getRequest()}
                <hr class="my-4"></hr>
                <div class="text-center">
                    <h2>Parsing response</h2>
                </div>
                {getResponse()}

                <hr class="my-4"></hr>
                <div class="text-center">
                    <h2>Creating teaser</h2>
                </div>
                {getConditions()}



                {getButtonCreate()}
            </div>
        </form>
    )
};

export default CreateRoutingRuleForm;