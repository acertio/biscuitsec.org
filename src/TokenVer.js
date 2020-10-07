import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CaveatInput1Verification from "./CaveatInput1Verification"
import CaveatInputVerification from "./CaveatInputVerification"
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FactParamInputVerification from './FactInputVerification'
import ShowPredicateCaveat from './ShowPredicate_caveat'

const toHex = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
const fromHex = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

class Debugger extends React.Component {
    constructor() {
        super();


        this.state = {
            token: [], token_example: [], token_verification: [], tokenToAttenuate: [], valueEncoded: '', valueDecoded: '', valueEncodedToAttenuate: '', valueDecodedToAttenuate: '', valueEncoded_example: '', valueEncoded_verification: '', valueDecoded_example: '', valueDecoded_verification: '',
            privateKey: '', publicKey: '', privateKey_own_verification: '', publicKey_own_verification: '', attenuation_publicKey: '', attenuation_privateKey: '', restrict: '', resource: '',
            expiration: '', restrict_verify: '', restrict_operation_message: '', resource_prefix_message: '', token_revocation_message: '', restrict_verify_example: '', resource_verify: ''
            , resource_verify_example: '', seconds: '', result_verification: '', gen_err: '', gen_err_empty: '', gen_err_example: ''
            , gen_err_attenuation: '', result_verification_example: '', message_encoded_verification: '', message_encoded_example: '',
            message_encoded_attenuation: '', message_encoded: '', message_privateKey: '', message_privateKey_own_verification: '', message_privateKey_attenuation: '', copied:false,
            //fact verification states
            verification_fact_head_name: "", verification_fact_head_parameters: [{ param: "", type: "" }],
            verification_facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
            verification_fact_adding_message: "", verification_fact_counter: 0, verification_number_of_added_fact: 0,
            //caveat verification states
            verification_caveat_head_parameter: [{ param: "", type: "" }], verification_caveat_ids_parameter: [{ param: "", type: "" }], verification_caveat_head_name: "", verification_caveat_ids_name: "",
            verification_caveats: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
            verification_caveat_adding_message: "", verification_caveat_counter: 0, verification_number_of_added_caveats_head: 0, verification_number_of_added_caveats_ids: 0,
            caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1, caveat_hidden_msg_predicate: "", caveat_predicate_deleting: ""


        }

    }
    componentDidMount() {
        this.loadWasm();
    }


    loadWasm = async () => {
        try {
            const wasm = await import("biscuit-wasm");

            this.setState({ wasm, });

        } catch (err) {
            console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
        }
    };
    handleChange = (e) => {

        if (["verification_caveat_head_parameter form-control"].includes(e.target.className)) {
            let verification_caveat_head_parameter = [...this.state.verification_caveat_head_parameter]
            verification_caveat_head_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ verification_caveat_head_parameter: verification_caveat_head_parameter }, () => console.log(this.state.verification_caveat_head_parameter))
        } else if (["verification_caveat_ids_parameter form-control"].includes(e.target.className)) {
            let verification_caveat_ids_parameter = [...this.state.verification_caveat_ids_parameter]
            verification_caveat_ids_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ verification_caveat_ids_parameter: verification_caveat_ids_parameter }, () => console.log(this.state.verification_caveat_ids_parameter))
        }
        else if (["verification_caveat_ids_parameter_type form-control"].includes(e.target.className)) {

            let verification_caveat_ids_parameter = [...this.state.verification_caveat_ids_parameter]
            verification_caveat_ids_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ verification_caveat_ids_parameter: verification_caveat_ids_parameter }, () => console.log(this.state.verification_caveat_ids_parameter))
        }
        else if (["verification_caveat_head_parameter_type form-control"].includes(e.target.className)) {
            let verification_caveat_head_parameter = [...this.state.verification_caveat_head_parameter]
            verification_caveat_head_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ verification_caveat_head_parameter: verification_caveat_head_parameter }, () => console.log(this.state.verification_caveat_head_parameter))
        }
        else if (["verification_caveat_head_name form-control"].includes(e.target.className)) {
            this.setState({ verification_caveat_head_name: e.target.value }, () => console.log(this.state.verification_caveat_head_name))

        }
        else if (["verification_caveat_ids_name form-control"].includes(e.target.className)) {
            this.setState({ verification_caveat_ids_name: e.target.value }, () => console.log(this.state.verification_caveat_ids_name))
        }

        else if (["verification_fact_head_name form-control"].includes(e.target.className)) {
            this.setState({ verification_fact_head_name: e.target.value }, () => console.log(this.state.verification_fact_head_name))
        }
        else if (["verification_fact_parameter form-control"].includes(e.target.className)) {
            let verification_fact_head_parameters = [...this.state.verification_fact_head_parameters]
            verification_fact_head_parameters[e.target.dataset.id].param = e.target.value
            this.setState({ verification_fact_head_parameters: verification_fact_head_parameters }, () => console.log(this.state.verification_fact_head_parameters))
        }
        else if (["verification_fact_parameter_type form-control"].includes(e.target.className)) {
            let verification_fact_head_parameters = [...this.state.verification_fact_head_parameters]
            verification_fact_head_parameters[e.target.dataset.id].type = e.target.value
            this.setState({ verification_fact_head_parameters: verification_fact_head_parameters }, () => console.log(this.state.verification_fact_head_parameters))
        }

    }
    handleChangee = (e) => {
        let serialized = this.state.token;
        let b64 = btoa(String.fromCharCode(...serialized));

        this.setState({ valueEncoded: b64, valueDecoded: e.target.value });
    }

    handleChange1 = (e) => {
        const { wasm = {} } = this.state;
        try {
            let data = new Uint8Array(atob(e.target.value).split("").map(function (c) {
                return c.charCodeAt(0);
            }));
            let token = wasm.Biscuit.from(data);
            this.setState({ token: token.toVec(), valueEncoded: e.target.value, valueDecoded: token.print(), message_encoded: "" });
        }
        catch (err) {
            this.setState({ valueEncoded: e.target.value })
            this.setState({ message_encoded: "Enter a valid token !" })
        }

    }

    handleChange_privateKey_own_verification = (e) => {
        const { wasm = {} } = this.state;
        try {

            this.setState({ message_privateKey_own_verification: "" })
            let privkey = new Uint8Array(32);
            let pubkey = new Uint8Array(32);
            let decoded = fromHex(e.target.value);
            let keypair = wasm.KeyPair.fromBytes(decoded);


            let publicKey = keypair.publicKey();

            keypair.toBytes(privkey);
            publicKey.toBytes(pubkey);

            this.setState({ privateKey_own_verification: toHex(privkey), publicKey_own_verification: toHex(pubkey) });
        }
        catch (err) {

            this.setState({ privateKey_own_verification: e.target.value })

            this.setState({ message_privateKey_own_verification: "enter a valid key !" })
        }

    }


    handleChange1_verification = (e) => {
        const { wasm = {} } = this.state;
        try {
            this.setState({ message_encoded_verification: "" })

            let data = new Uint8Array(atob(e.target.value).split("").map(function (c) {
                return c.charCodeAt(0);
            }));
            let token = wasm.Biscuit.from(data);
            this.setState({ token_verification: token.toVec(), valueEncoded_verification: e.target.value, valueDecoded_verification: token.print(), message_encoded_verification: "" });
        }
        catch (err) {
            this.setState({ valueEncoded_verification: e.target.value })
            this.setState({ message_encoded_verification: "Enter a valid token !" })
        }

    }



    addFactVerification = (e) => {
        this.setState((prevState) => ({
            verification_fact_head_parameters: [...prevState.verification_fact_head_parameters, { param: "", type: "" }], verification_number_of_added_fact: this.state.verification_number_of_added_fact + 1
        }));
    }

    addCaveatAttenuation = (e) => {
        this.setState((prevState) => ({
            attenuation_caveat_head_parameter: [...prevState.attenuation_caveat_head_parameter, { param: "", type: "" }], attenuation_number_of_added_caveats_head: this.state.attenuation_number_of_added_caveats_head + 1
        }));
    }
    addCaveat1Verification = (e) => {
        this.setState((prevState) => ({
            verification_caveat_ids_parameter: [...prevState.verification_caveat_ids_parameter, { param: "", type: "" }], verification_number_of_added_caveats_ids: this.state.verification_number_of_added_caveats_ids + 1
        }));
    }
    delPredicate_caveat = async (e) => {
        this.setState({ caveat_predicate_deleting: "" })
        try {
            console.log("in predicate caveat body", this.state.caveat_body);


            if (this.state.caveat_body.length === 0) {
                throw (SyntaxError("You don't have any predicate to delete !"))

            }
            else if (this.state.caveat_body.length === 1) {
                this.setState({ caveat_body: [], caveat_predicate_deleting: "Your last predicate has been deleted", caveat_predicate_adding: "" })
            }
            else {
                let n = [...this.state.caveat_body.splice(this.state.caveat_body.length - 1, 1)]
                console.log("in predicate caveat body", n);

                this.setState((prevState) => ({

                    caveat_body: [...n], caveat_predicate_deleting: "Your last predicate has been deleted", caveat_predicate_adding: ""

                }));
                await new Promise(r => setTimeout(r, 3000));
                console.log("last caveat body", this.state.caveat_body)

            }
        }
        catch (e) {
            this.setState({ caveat_predicate_deleting: e.message })
        }
    }
    addPredicate_caveat = async (e) => {
        this.setState({ caveat_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));
        try {
            for (let pas = 1; pas < this.state.verification_caveat_ids_parameter.length; pas++) {
                if (this.state.verification_caveat_ids_name === "" || this.state.verification_caveat_ids_parameter[pas].param === "" || this.state.verification_caveat_ids_parameter[pas].type === "") {
                    throw (SyntaxError("all predicate fields must be filled out"))

                }
            }

            if (this.state.caveat_body.length === 0) {

                this.setState({
                    caveat_body: [{ ids_name: this.state.verification_caveat_ids_name, caveat_ids_parameter: this.state.verification_caveat_ids_parameter }], verification_caveat_ids_name: "", verification_caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1, caveat_hidden_msg_predicate: "Your added predicates :"



                })
                await new Promise(r => setTimeout(r, 1000));
                console.log("caveat body", this.state.caveat_body);

            }
            else {

                this.setState((prevState) => ({

                    caveat_body: [...prevState.caveat_body, { ids_name: this.state.verification_caveat_ids_name, caveat_ids_parameter: this.state.verification_caveat_ids_parameter }], caveat_ids_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1, caveat_hidden_msg_predicate: "Your added predicates :"
                }));
            }
        }
        catch (e) {
            this.setState({ caveat_predicate_adding: e.message })
        }
    }
    handleChange4 = (e) => {


        this.setState({ resource_verify: e.target.value });
    }
    copy() {
        this.setState({copied:true})
        const el = this.textArea
        el.select()
        document.execCommand("copy")
    }
    handleChange4_example = (e) => {


        this.setState({ resource_verify_example: e.target.value });
    }
    handleChange5_example = (e) => {


        this.setState({ restrict_verify_example: e.target.value });
    }
    handleChange5 = (e) => {


        this.setState({ restrict_verify: e.target.value });
    }
    addCaveatVerification = (e) => {
        this.setState((prevState) => ({
            verification_caveat_head_parameter: [...prevState.verification_caveat_head_parameter, { param: "", type: "" }], verification_number_of_added_caveats_head: this.state.verification_number_of_added_caveats_head + 1
        }));
    }
    render() {
        const { wasm = {} } = this.state;
        const btnText = this.state.copied ? 'Copied' : 'Copy to clipboard'



        let verification_caveat_head_parameter = [...this.state.verification_caveat_head_parameter]
        let verification_fact_head_parameters = [...this.state.verification_fact_head_parameters]
        let verification_caveat_ids_parameter = [...this.state.verification_caveat_ids_parameter]

        return (
            <div>
                {/* <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="text" value={this.state.value} onChange={this.handleChange}/> */}
                <div className="container-fluid">
                    <div className="warning">
                        <div className="text-center">
                            <strong>Biscuitsec :</strong>

                        Learn how the biscuit token works by interacting with it. For developers, the code of the application is available on our github
                        </div>
                    </div>

                    <h1 className="mr-5 text-center">Token Verification </h1>
                    <br />
                    <div className="ml-5">In the verification process :
                    <ul>
                            <li>
                                Ambient data like operation, resource, fact , etc must be added to the verifier in order to generate new facts

                        </li>
                            <li>
                                You can add a rule to verify on the token
                        </li>
                        </ul>
                    </div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Public Key</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" readOnly value={this.state.publicKey_own_verification} rows="2" />
                                </div>



                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label className="exampleFormControlTextarea1"><h5>Private Key</h5></label><small> paste your private key here</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" type="text" value={this.state.privateKey_own_verification} onChange={this.handleChange_privateKey_own_verification} rows="2" />
                                </div>
                                <div>{
                                    this.state.message_privateKey_own_verification}</div>

                            </div>

                        </div>

                    </div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="textarea-container">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label><small> paste a token to verify here</small>
                                    <textarea ref={(textarea) => this.textArea = textarea}  className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.valueEncoded_verification} onChange={this.handleChange1_verification} rows="15" />
                                    <a onClick={() => this.copy()}>{btnText}</a>

                                </div>
                                <div>{this.state.message_encoded_verification}</div>
                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>DECODED</h5></label><small> your result</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" readOnly type="text" value={this.state.valueDecoded_verification} rows="15" />
                                </div>


                            </div>
                        </div>
                    </div>
                    <br />
                    <h2 className="mr-5 ml-5">Example of Token Verification </h2>
                    <div className="mr-5 ml-5">This example illustrates a token verification , the verifier will verify if the user has the right to do the operation on the resource he specified. </div>
                    <div className="mr-5 ml-5">For more details click <a href="https://www.w3schools.com/">here</a></div>

                    {/* <div className="container-fluid mt-10">
                                    <div className="col-10">
                                    <pre style={mystyle}>{`let verifier = new wasm.Verifier()
//adding ambient data
//add the resource to the verifier
verifier.addResource(resource);
//add the operation to the verifier
verifier.addOperation(operation);
//adding a rule to verify
//this rule will verify if the token holder has the right to do the operation on the resource he specified in the playground
let rule = wasm.rule(
        "check_right",
        [
             { variable: 0 },
             { variable: 1 }
        ],
        [
             {
                name: "resource",
                ids: [{ symbol: "ambient" }, { variable: 0 }]
             },
             {
                name: "operation",
                ids: [{ symbol: "ambient" }, { variable: 1 }]
             },
             {
                name: "right",
                ids: [{ symbol: "authority" }, { variable: 0 }, { variable: 1 }]
             }
        ]
                    );
//adding the rule to verify
verifier.addCaveat(rule);
//reconstructing the keypair from the hexadicimal private key
let keypair = wasm.KeyPair.fromBytes(fromHex(privateKey));
//verification of the token
let result = verifier.verify(keypair.publicKey(), token);`}</pre>
                    
                                    </div>
                    </div>
                    <div className="ml-5">You Can try the verification with our example of token for file management in the page Token Generation  
                    </div>   
                    <br /> */}
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.resource_verify_example} placeholder="/apps/123" onChange={this.handleChange4_example} rows="1" />
                                </div>



                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label className="exampleFormControlTextarea1"><h5>Operation to verify on the resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" type="text" value={this.state.restrict_verify_example} placeholder="read" onChange={this.handleChange5_example} rows="1" />
                                </div>
                                <button
                                    onClick={async () => {

                                        try {
                                            if (this.state.valueEncoded_verification === '') {
                                                throw SyntaxError("You must enter the token to verify")
                                            }
                                            else if (this.state.privateKey_own_verification === "") {
                                                throw SyntaxError("You must enter your private key")

                                            }
                                            let data = new Uint8Array(atob(this.state.valueEncoded_verification).split("").map(function (c) {
                                                return c.charCodeAt(0);
                                            }));
                                            let token = wasm.Biscuit.from(data);
                                            let verifier = new wasm.Verifier()
                                            verifier.addResource(this.state.resource_verify_example);
                                            verifier.addOperation(this.state.restrict_verify_example);
                                            verifier.setTime((new Date().getTime() / 1000).toFixed(0));
                                            let rule = wasm.rule(
                                                "check_right",
                                                [
                                                    { variable: 0 },
                                                    { variable: 1 }
                                                ],
                                                [
                                                    {
                                                        name: "resource",
                                                        ids: [{ symbol: "ambient" }, { variable: 0 }]
                                                    },
                                                    {
                                                        name: "operation",
                                                        ids: [{ symbol: "ambient" }, { variable: 1 }]
                                                    },
                                                    {
                                                        name: "right",
                                                        ids: [{ symbol: "authority" }, { variable: 0 }, { variable: 1 }]
                                                    }
                                                ]
                                            );

                                            verifier.addCaveat(rule);

                                            let keypair = wasm.KeyPair.fromBytes(fromHex(this.state.privateKey_own_verification));

                                            try {
                                                let result = verifier.verify(keypair.publicKey(), token);
                                                this.setState({ result_verification_example: "OK" });
                                            } catch (error) {
                                                this.setState({ result_verification_example: "FAILED" });
                                            }

                                        }
                                        catch (e) {
                                            this.setState({ result_verification_example: e.message });
                                        }





                                    }}>
                                    Verify Your Token
                                </button>
                                <div className="verification">
                                    {this.state.result_verification_example}
                                </div>
                            </div>

                        </div>


                    </div>
                    <br />
                    <h2 className="mr-5 ml-5">Set Your Own Token Verification </h2>
                    <br />
                    <div className="ml-5">You can add opeartion,resource,fact or rule to be verified on your token</div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h3>Add Ambient Data</h3></label>
                                </div>
                            </div>
                        </div>
                        <div className="ml-5 mr-5">The ambient data is the information on the resources , operations the verifier provide before the verification </div>
                        <br />
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.resource_verify} placeholder="car1" onChange={this.handleChange4} rows="1" />
                                </div>



                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label className="exampleFormControlTextarea1"><h5>Operation to verify on the resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" type="text" value={this.state.restrict_verify} placeholder="drive" onChange={this.handleChange5} rows="1" />
                                </div>


                            </div>


                        </div>
                        <br />
                    </div>
                    <div className="container-fluid mt-10" onChange={this.handleChange}>
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <label className="exampleFormControlTextarea1"><h5>Fact</h5></label>

                            </div>
                        </div>
                        <div className="ml-5">Ambient facts can only be provided by the verifier, and are represented by the #ambient symbol as the first element of a fact. They indicate data related to the operation the token is authorizing</div>
                        <br />
                        <div className="row">

                            <div className="col-1 mr-2 ml-5">
                                <div className="row">
                                    <label >{`fact name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.verification_fact_head_name}
                                        className="verification_fact_head_name form-control"
                                        id="verification-fact-head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <FactParamInputVerification rules={verification_fact_head_parameters}
                                type="text"

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addFactVerification} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>

                        </div>



                        <br />
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-0 mr-1 ">
                                <button className="col-12" onClick={async () => {
                                     
                                    try {
                                        this.setState({ verification_fact_adding_message: '' })
                                        for (let pas = 0; pas < this.state.verification_fact_head_parameters.length; pas++) {
                                            if (this.state.verification_fact_head_name === "" || this.state.verification_fact_head_parameters[pas].param === "" || this.state.verification_fact_head_parameters[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))
    
                                            }
                                        }
                                        if (this.state.verification_fact_counter === 0) {
                                            console.log("number of facts", this.state.verification_number_of_added_fact);
                                       
                                            this.setState({
                                                verification_facts: [{ fact_head_parameters: this.state.verification_fact_head_parameters, fact_head_name: this.state.verification_fact_head_name, }]
                                            });
                                        }
                                        else {
                                            
                                            this.setState((prevState) => ({
                                                verification_facts: [...prevState.verification_facts, { fact_head_parameters: this.state.verification_fact_head_parameters, fact_head_name: this.state.verification_fact_head_name, }]
                                            }));
                                        }

                                        this.setState({ verification_fact_adding_message: "Your new fact has been added" });

                                        this.setState({ verification_fact_counter: this.state.verification_fact_counter + 1 })
                                        this.setState({ verification_fact_head_name: "", verification_fact_head_parameters: [{ param: "", type: "" }] })


                                    }
                                    catch (e) {

                                        this.setState({ verification_fact_adding_message: e.message })

                                    }
                                }}>add fact</button>
                            </div>
                            <div className="col-2 ml-3">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({



                                            verification_fact_head_name: "", verification_fact_head_parameters: [{ param: "", type: "" }],
                                            
                                            verification_fact_adding_message: "", 
                                        })





                                    }}>Reset fact</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-2 mr-2 ml-5">
                                <div id="verification_fact_adding_result">{this.state.verification_fact_adding_message}</div>

                            </div>
                        </div>
                        <br />
                        <div className="row">

                            <div className="col-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h3>Add a Rule to verify</h3></label>
                                </div>
                            </div>
                        </div>
                        <div className="ml-5">Add a rule to verify on your token . for example if we set this rule : <pre>{`
                            rule(
                                "right",//head name
                                [{ symbol: "right" }],//head parameter
                                [
                                    {
                                        name: "right",//ids name
                                        ids: [{ symbol: "authority" }, { string:room1 }, { symbol: "open" }]//ids paramter
                                    }
                                ]
                            )

                            `}</pre> The verifier will verify if the token holder has the authority right to open the room1</div>
                        <br />
                        <div className="ml-5"><h4>Header</h4></div>

                        <div className="row">

                            <div className="col-1 mr-2 ml-5">
                                <div className="row">
                                    <label >{`head name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.verification_caveat_head_name}
                                        className="verification_caveat_head_name form-control"
                                        id="head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <CaveatInputVerification rules={verification_caveat_head_parameter}

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addCaveatVerification} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>
                        </div>
                        <div className="ml-5"><h4>Body</h4></div>
                        <h5 className="ml-5">{this.state.caveat_hidden_msg_predicate}</h5>

                        <ShowPredicateCaveat predicates={this.state.caveat_body} />
                        <div className="row">
                            <div className="col-1 ml-5">
                                <div className="row">
                                    <label >{`pid${this.state.caveat_idx} `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.verification_caveat_ids_name}
                                        className="verification_caveat_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <CaveatInput1Verification rules={verification_caveat_ids_parameter} caveat_idx={this.state.caveat_idx}



                            />
                            <div className="col-0 mr-2">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >
                                    <h3>
                                        <IconButton onClick={this.addCaveat1Verification} >
                                            < AddCircleIcon />
                                        </IconButton>
                                    </h3>


                                </div>
                            </div>

                            <div className="col-1 ml-1">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >

                                    <button onClick={this.addPredicate_caveat} >
                                        add predicate
                                        </button>
                                    <div>{this.state.caveat_predicate_adding}</div>



                                </div>
                            </div>
                            <div className="col-1 ml-1">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >


                                    <button onClick={this.delPredicate_caveat} >
                                        Delete last predicate
                                    </button>
                                    <div>{this.state.caveat_predicate_deleting}</div>




                                </div>
                            </div>













                        </div>
                        <br />
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-0 ">
                                <button onClick={async () => {
                                    try {

                                        // for (let pas = 0; pas < this.state.verification_number_of_added_caveats_head + 1; pas++) {
                                        //     if (this.state.verification_caveat_head_name === "" || this.state.verification_caveat_head_parameter[pas].param === "" || this.state.verification_caveat_head_parameter[pas].type === "") {
                                        //         throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                        //     }
                                        // }
                                        // for (let pas = 0; pas < this.state.verification_number_of_added_caveats_ids + 1; pas++) {
                                        //     if (this.state.verification_caveat_ids_name === "" || this.state.verification_caveat_ids_parameter[pas].param === "" || this.state.verification_caveat_ids_parameter[pas].type === "") {
                                        //         throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                        //     }
                                        // }
                                        this.setState({ verification_caveat_adding_message: '' })
                                        for (let pas = 0; pas < this.state.verification_caveat_head_parameter.length; pas++) {
                                            if (this.state.verification_caveat_head_name === "" || this.state.verification_caveat_head_parameter[pas].param === "" || this.state.verification_caveat_head_parameter[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        if (this.state.caveat_body.length === 0) {
                                            throw (SyntaxError("You must at least add one predicate !"))
                                        }

                                        if (this.state.verification_caveat_counter === 0) {


                                            this.setState({
                                                verification_caveats: [{ head_parameter: this.state.verification_caveat_head_parameter, head_name: this.state.verification_caveat_head_name, body: this.state.caveat_body }]
                                            });
                                        }
                                        else {

                                            this.setState((prevState) => ({
                                                verification_caveats: [...prevState.verification_caveats, { head_parameter: this.state.verification_caveat_head_parameter, ids_parameter: this.state.verification_caveat_ids_parameter, head_name: this.state.verification_caveat_head_name, ids_name: this.state.verification_caveat_ids_name }]
                                            }));
                                        }
                                        this.setState({ verification_caveat_adding_message: "Your new rule has been added" });

                                        this.setState({ verification_caveat_counter: this.state.verification_caveat_counter + 1 })
                                        this.setState({ verification_caveat_head_name: "", verification_caveat_head_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "", body: [], caveat_body: [], caveat_idx: 1 })

                                        await new Promise(r => setTimeout(r, 2000));
                                        console.log(this.state.verification_caveats)

                                    }
                                    catch (e) {
                                        this.setState({ verification_caveat_adding_message: e.message })
                                    }


                                }}>add rule</button>
                            </div>


                            <div className="col-1 ml-1">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({


                                            verification_caveat_head_parameter: [{ param: "", type: "" }], verification_caveat_ids_parameter: [{ param: "", type: "" }], verification_caveat_head_name: "", verification_caveat_ids_name: "",
                                            verification_caveat_adding_message: "",
                                            caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1, caveat_hidden_msg_predicate: "", caveat_predicate_deleting: ""

                                        })





                                    }}>Reset rule</button>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="verification_caveat_adding_result">{this.state.verification_caveat_adding_message}</div>

                            </div>
                        </div>

                        <br /> <br />

                        <br />
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-2 ml-5">
                                <button
                                    onClick={async () => {
                                        try {
                                            if (this.state.valueEncoded_verification === '') {
                                                throw SyntaxError("You must enter the token to verify")
                                            }
                                            else if (this.state.privateKey_own_verification === "") {
                                                throw SyntaxError("You must enter your private key")

                                            }

                                            let data = new Uint8Array(atob(this.state.valueEncoded_verification).split("").map(function (c) {
                                                return c.charCodeAt(0);
                                            }));
                                            let token = wasm.Biscuit.from(data);
                                            let verifier = new wasm.Verifier()
                                            verifier.addResource(this.state.resource_verify);

                                            verifier.addOperation(this.state.restrict_verify);
                                            console.log("caveat counter :", this.state.verification_caveat_counter);
                                            if (this.state.verification_caveat_counter > 0) {
                                                for (let pas = 0; pas < this.state.verification_caveats.length; pas++) {
                                                    console.log("step {}", pas);
                                                    let head_parameter1 = [...this.state.verification_caveats[pas].head_parameter];
                                                    let head_parameter = [];
                                                    for (let pas1 = 0; pas1 < head_parameter1.length; pas1++) {
                                                        if (head_parameter1[pas1].type === "variable") {
                                                            head_parameter = [...head_parameter, { variable: parseInt(head_parameter1[pas1].param) }]
                                                        }
                                                        else if (head_parameter1[pas1].type === "string") {
                                                            head_parameter = [...head_parameter, { string: head_parameter1[pas1].param }]
                                                        }
                                                        else if (head_parameter1[pas1].type === "symbol") {
                                                            head_parameter = [...head_parameter, { symbol: head_parameter1[pas1].param }]
                                                        }
                                                        else if (head_parameter1[pas1].type === "integer") {
                                                            head_parameter = [...head_parameter, { integer: parseInt(head_parameter1[pas1].param) }]
                                                        }
                                                        else if (head_parameter1[pas1].type === "date") {
                                                            head_parameter = [...head_parameter, { date: Date.parse(head_parameter1[pas1].param) }]
                                                        }
                                                    }
                                                    // console.log(head_parameter)
                                                    let body = [...this.state.verification_caveats[pas].body];
                                                    let body_for_rule = [];
                                                    for (let pas1 = 0; pas1 < body.length; pas1++) {
                                                        let ids_name = body[pas1].ids_name
                                                        let ids_parameters = [...body[pas1].caveat_ids_parameter]
                                                        let ids_parameter_for_rule = []
                                                        for (let pas2 = 0; pas2 < ids_parameters.length; pas2++) {
                                                            if (ids_parameters[pas2].type === "variable") {
                                                                ids_parameter_for_rule = [...ids_parameter_for_rule, { variable: parseInt(ids_parameters[pas2].param) }]
                                                            }
                                                            else if (ids_parameters[pas2].type === "string") {
                                                                ids_parameter_for_rule = [...ids_parameter_for_rule, { string: ids_parameters[pas2].param }]
                                                            }
                                                            else if (ids_parameters[pas2].type === "symbol") {
                                                                ids_parameter_for_rule = [...ids_parameter_for_rule, { symbol: ids_parameters[pas2].param }]
                                                            }
                                                            else if (ids_parameters[pas2].type === "integer") {
                                                                ids_parameter_for_rule = [...ids_parameter_for_rule, { integer: parseInt(ids_parameters[pas2].param) }]
                                                            }
                                                            else if (ids_parameters[pas2].type === "date") {
                                                                ids_parameter_for_rule = [...ids_parameter_for_rule, { date: Date.parse(ids_parameters[pas2].param) }]
                                                            }
                                                        }
                                                        body_for_rule = [...body_for_rule, {
                                                            name: ids_name,
                                                            ids: ids_parameter_for_rule
                                                        }]
                                                    }
                                                    console.log("body_for_rule", body_for_rule);


                                                    let rule = wasm.rule(
                                                        this.state.verification_caveats[pas].head_name,
                                                        head_parameter,
                                                        body_for_rule
                                                    )
                                                    verifier.addCaveat(rule);
                                                }
                                            }

                                            console.log("fact counter :", this.state.verification_fact_counter);
                                            if (this.state.verification_fact_counter > 0) {
                                                console.log("verification facts", this.state.verification_facts)
                                                for (let pas = 0; pas < this.state.verification_facts.length; pas++) {

                                                    let fact_parameter1 = [...this.state.verification_facts[pas].fact_head_parameters];
                                                    let fact_parameter = [];
                                                    for (let pas1 = 0; pas1 < fact_parameter1.length; pas1++) {
                                                        if (fact_parameter1[pas1].type === "variable") {
                                                            fact_parameter = [...fact_parameter, { variable: parseInt(fact_parameter1[pas1].param) }]
                                                        }
                                                        else if (fact_parameter1[pas1].type === "string") {
                                                            fact_parameter = [...fact_parameter, { string: fact_parameter1[pas1].param }]
                                                        }
                                                        else if (fact_parameter1[pas1].type === "symbol") {
                                                            fact_parameter = [...fact_parameter, { symbol: fact_parameter1[pas1].param }]
                                                        }
                                                        else if (fact_parameter1[pas1].type === "integer") {
                                                            fact_parameter = [...fact_parameter, { integer: parseInt(fact_parameter1[pas1].param) }]
                                                        }
                                                        else if (fact_parameter1[pas1].type === "date") {
                                                            fact_parameter = [...fact_parameter, { date: Date.parse(fact_parameter1[pas1].param) }]
                                                        }
                                                    }
                                                    console.log("fact parameter for verification", fact_parameter)
                                                    let fact = wasm.fact(
                                                        this.state.verification_facts[pas].fact_head_name,
                                                        fact_parameter,

                                                    )
                                                    verifier.addFact(fact);



                                                }


                                            }


                                            let keypair = wasm.KeyPair.fromBytes(fromHex(this.state.privateKey_own_verification));
                                            try {
                                                let result = verifier.verify(keypair.publicKey(), token);
                                                this.setState({ result_verification: "OK" });
                                            }
                                            catch (error) {
                                                this.setState({ result_verification: "Failed" });

                                            }
                                        }
                                        catch (e) {
                                            this.setState({ result_verification: e.message });
                                        }



                                    }}>
                                    Verify Your Token
                                </button>
                                <div className="verification">
                                    {this.state.result_verification}
                                </div>
                            </div>
                        </div>


                    </div>


                </div>

            </div >

        )
    }
}
export default Debugger;


