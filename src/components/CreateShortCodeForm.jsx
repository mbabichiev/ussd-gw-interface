import React, { useState } from 'react';
import FormInput from './FormInput';
import FormText from './FormText';


const CreateShortCodeForm = ({ update, close, link }) => {

    const [shortCode, setShortCode] = useState('');
    const [requestType, setRequestType] = useState('HTTP');
    const [timeout, setTimeout] = useState(5000);
    const [httpUrl, setHttpUrl] = useState('');
    const [httpParams, setHttpParams] = useState('');
    const [httpRequestBody, setHttpRequestBody] = useState('');
    const [httpMethod, setHttpMethod] = useState("GET");
    const [httpPostFormat, setHttpPostFormat] = useState("JSON");
    const [httpResponseFormat, setHttpResponseFormat] = useState('JSON');
    const [httpResponseText, setHttpResponseText] = useState('');
    const [httpResponseBody, setHttpResponseBody] = useState('');
    const [resultResponse, setResultResponse] = useState('');


    const [secondRequestType, setSecondRequestType] = useState('HTTP');
    const [secondTimeout, setSecondTimeout] = useState(5000);
    const [secondHttpUrl, setSecondHttpUrl] = useState('');
    const [secondHttpParams, setSecondHttpParams] = useState('');
    const [secondHttpRequestBody, setSecondHttpRequestBody] = useState('');
    const [secondHttpMethod, setSecondHttpMethod] = useState("GET");
    const [secondHttpPostFormat, setSecondHttpPostFormat] = useState("JSON");
    const [secondHttpResponseFormat, setSecondHttpResponseFormat] = useState('JSON');
    const [secondHttpResponseText, setSecondHttpResponseText] = useState('');
    const [secondHttpResponseBody, setSecondHttpResponseBody] = useState('');
    const [secondResultResponse, setSecondResultResponse] = useState('');

    const [defaultSuccessAnswer, setDefaultSuccessAnswer] = useState("Thank you very much! Your request is being processed.")
    const [defaultAnswer, setDefaultAnswer] = useState("Sorry, an error occurred. Please try again later.")

    const [classForm, setClassForm] = useState("fw-light");
    const [isShortCodeCreating, setIsShortCodeCreating] = useState(false);

    function create(e) {
        e.preventDefault();
        setClassForm("fw-light was-validated")
    }

    function getButtonCreate() {
        if (isShortCodeCreating) {
            return (
                <button class="btn btn-primary btn-lg" type="button" disabled="">
                    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Creating short code...</span>
                </button>
            )
        }
        return (
            <button class="btn btn-primary btn-lg" onClick={create}>Create</button>
        )
    }

    function getFirstRequestData() {
        if (requestType === "No request") {
            return;
        }
        let timeoutInput = (
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
        if (requestType === "HTTP") {
            return (
                <>
                    {timeoutInput}
                    <div class="col-md-3">
                        <label for="request-type" class="form-label">HTTP method</label>
                        <select class="form-select" id="request-type" value={httpMethod} onChange={e => setHttpMethod(e.target.value)}>
                            <option>GET</option>
                            <option>POST</option>
                        </select>
                    </div>
                    {
                        httpMethod === "POST"
                            ? <div class="col-md-3">
                                <label for="request-type" class="form-label">HTTP format</label>
                                <select class="form-select" id="request-type" value={httpPostFormat} onChange={e => setHttpPostFormat(e.target.value)}>
                                    <option>JSON</option>
                                    <option>XML</option>
                                </select>
                            </div>
                            : null
                    }
                    <FormInput
                        name="Url"
                        errorText={"Url is required"}
                        id="url"
                        value={httpUrl}
                        onChange={e => setHttpUrl(e.target.value)}
                        placeholder="http://127.0.0.1:8080/request"
                        required
                    />
                    {
                        httpMethod === "GET"
                            ? <div class="col-md-12">
                                <FormInput
                                    name="Params"
                                    errorText={"Url is required"}
                                    id="params"
                                    value={httpParams}
                                    onChange={e => setHttpParams(e.target.value)}
                                    placeholder="/msisdn={MSISDN}&sc={SHORTCODE}&did={DIALOGID}"
                                />
                            </div>
                            : <div class="col-md-12">
                                <FormText
                                    name="Body"
                                    id="http-body"
                                    value={httpRequestBody}
                                    onChange={e => setHttpRequestBody(e.target.value)}
                                />
                            </div>
                    }

                </>
            )
        }

        // if MAP
        return (
            <>
                {timeoutInput}
            </>
        )
    }

    function getSecondRequestData() {
        if (secondRequestType === "No request") {
            return;
        }
        let timeoutInput = (
            <div class="col-md-3">
                <FormInput
                    name="Timeout"
                    errorText={"Timeout is required"}
                    id="timeout"
                    value={secondTimeout}
                    onChange={e => setSecondTimeout(e.target.value)}
                    placeholder="5000"
                    required
                />
            </div>
        )
        if (secondRequestType === "HTTP") {
            return (
                <>
                    {timeoutInput}
                    <div class="col-md-3">
                        <label for="request-type" class="form-label">HTTP method</label>
                        <select class="form-select" id="request-type" value={secondHttpMethod} onChange={e => setSecondHttpMethod(e.target.value)}>
                            <option>GET</option>
                            <option>POST</option>
                        </select>
                    </div>
                    {
                        httpMethod === "POST"
                            ? <div class="col-md-3">
                                <label for="request-type" class="form-label">HTTP format</label>
                                <select class="form-select" id="request-type" value={secondHttpPostFormat} onChange={e => setSecondHttpPostFormat(e.target.value)}>
                                    <option>JSON</option>
                                    <option>XML</option>
                                </select>
                            </div>
                            : null
                    }
                    <FormInput
                        name="Url"
                        errorText={"Url is required"}
                        id="url"
                        value={setHttpUrl}
                        onChange={e => setSecondHttpUrl(e.target.value)}
                        placeholder="http://127.0.0.1:8080/request"
                        required
                    />
                    {
                        secondHttpMethod === "GET"
                            ? <div class="col-md-12">
                                <FormInput
                                    name="Params"
                                    errorText={"Params is required"}
                                    id="params"
                                    value={secondHttpParams}
                                    onChange={e => setSecondHttpParams(e.target.value)}
                                    placeholder="/msisdn={MSISDN}&sc={SHORTCODE}&did={DIALOGID}"
                                />
                            </div>
                            : <div class="col-md-12">
                                <FormText
                                    name="Body"
                                    id="http-body"
                                    value={secondHttpRequestBody}
                                    onChange={e => setSecondHttpRequestBody(e.target.value)}
                                />
                            </div>
                    }

                </>
            )
        }

        // if MAP
        return (
            <>
                {timeoutInput}
            </>
        )
    }

    function getFirstResponseData() {
        if (requestType === "HTTP") {
            let result;
            if (httpResponseFormat === "No response") {
                result = <FormText
                    value={defaultSuccessAnswer}
                    onChange={e => setDefaultSuccessAnswer(e.target.value)}
                    name={"Default answer"}
                />
            }
            else if (httpResponseFormat === "Text") {
                result = <FormInput
                    name="Expected response text"
                    id="http-response-text"
                    value={httpResponseText}
                    onChange={e => setHttpResponseText(e.target.value)}
                    placeholder="Balance: {BALANCE}"
                />
            }
            else {
                result = <FormText
                    value={httpResponseBody}
                    onChange={e => setHttpResponseBody(e.target.value)}
                    name={"Expected response body"}
                />
            }
            return (
                <>
                    <div class="col-md-4">
                        <label for="response-type" class="form-label">Expected HTTP format</label>
                        <select class="form-select" id="response-type" value={httpResponseFormat} onChange={e => setHttpResponseFormat(e.target.value)}>
                            <option>JSON</option>
                            <option>XML</option>
                            <option>Text</option>
                            <option>No response</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        {result}
                    </div>
                    {httpResponseFormat !== "No response"
                        ?
                        <div class="col-md-12">
                            <FormText
                                value={resultResponse}
                                onChange={e => setResultResponse(e.target.value)}
                                name={"Result answer"}
                            />
                        </div> : null
                    }
                </>
            )
        }

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

                {
                    // SEND FIRST REQUEST
                }
                <hr class="my-4"></hr>

                <h2 class="fw-light"> Send request</h2>

                <div class="col-md-3">
                    <label for="request-type" class="form-label">Request type</label>
                    <select class="form-select" id="request-type" value={requestType} onChange={e => setRequestType(e.target.value)}>
                        <option>HTTP</option>
                        <option>MAP</option>
                        <option>No request</option>
                    </select>
                </div>
                {
                    getFirstRequestData()
                }
                {
                    requestType !== "HTTP" && requestType !== "MAP"
                        ?
                        <FormText
                            value={defaultAnswer}
                            name={"Default answer"}
                            onChange={e => setDefaultAnswer(e.target.value)}
                        />
                        :
                        <>


                            {
                                // HANDLING FIRST REQUEST IF SUCCESS
                            }
                            <hr class="my-4"></hr>
                            <h2 class="fw-light" style={{ color: "#90EE90" }}>If success:</h2>
                            <div class="col-md-1">
                            </div>
                            <div class="col-md-11">
                                <div class="row g-3">
                                    {getFirstResponseData()}
                                </div>
                            </div>


                            {
                                // HANDLING FIRST REQUEST IF FAILURE
                            }
                            <h2 class="fw-light" style={{ color: "red" }}>If failure:</h2>
                            <div class="col-md-1">
                            </div>
                            <div class="col-md-11">
                                <div class="row g-3">
                                    {
                                        // SEND SECOND REQUEST IF FIRST ONE IS FAILURE
                                    }

                                    <h2 class="fw-light"> Send request</h2>

                                    <div class="col-md-3">
                                        <label for="request-type" class="form-label">Request type</label>
                                        <select class="form-select" id="request-type" value={secondRequestType} onChange={e => setSecondRequestType(e.target.value)}>
                                            <option>HTTP</option>
                                            <option>MAP</option>
                                            <option>No request</option>
                                        </select>
                                    </div>
                                    {
                                     getSecondRequestData()
                                    }
                                    {secondRequestType !== "HTTP" && secondRequestType !== "MAP"
                                        ?
                                        <FormText
                                            value={defaultAnswer}
                                            name={"Default answer"}
                                            onChange={e => setDefaultAnswer(e.target.value)}
                                        />
                                        :
                                        <>

                                            {
                                                // HALDLING SECOND REQUEST IF SUCCESS
                                            }
                                            <hr class="my-4"></hr>
                                            <h2 class="fw-light" style={{ color: "#90EE90" }}>If success:</h2>
                                            <div class="row g-3">
                                                <div class="col-md-1">
                                                </div>
                                                <div class="col-md-11 fw-light">
                                                    <h2 class="fw-light">Parsing response</h2>
                                                </div>

                                                {
                                                    // HALDLING SECOND REQUEST IF FAILURE
                                                }
                                                <h2 class="fw-light" style={{ color: "red" }}>If failure:</h2>
                                                <div class="col-md-1">
                                                </div>
                                                <div class="col-md-11">
                                                    <FormText
                                                        value={defaultAnswer}
                                                        name={"Default answer"}
                                                        onChange={e => setDefaultAnswer(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>
                            </div>
                        </>
                }

                {getButtonCreate()}
            </div>
        </form>
    )
};

export default CreateShortCodeForm;