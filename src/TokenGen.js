import React from 'react'
import HeadInput from "./headinput"
import HeadInput1 from "./headinput1"
import HeadInput1Caveat from "./HeadInput1_caveat"
import HeadInputCaveat from "./HeadInput_caveat"
import FactParamInput from "./FactParamInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShowPredicate from './ShowPredicate'
import ShowPredicateCaveat from './ShowPredicate_caveat'
const toHex = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
const fromHex = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

class TokenGen extends React.Component {
    constructor() {
        super();


        this.state = {
            token: [], token_example: [], token_verification: [], tokenToAttenuate: [], valueEncoded: '', valueDecoded: '', valueEncodedToAttenuate: '', valueDecodedToAttenuate: '', valueEncoded_example: '', valueEncoded_verification: '', valueDecoded_example: '', valueDecoded_verification: '',
            privateKey: '', publicKey: '', privateKey_own_verification: '', publicKey_own_verification: '', attenuation_publicKey: '', attenuation_privateKey: '', restrict: '', resource: '',
            expiration: '', restrict_verify: '', restrict_operation_message: '', resource_prefix_message: '', token_revocation_message: '', restrict_verify_example: '', resource_verify: ''
            , resource_verify_example: '', seconds: '', result_verification: '', gen_err: '', gen_err_empty: '', gen_err_example: ''
            , gen_err_attenuation: '', result_verification_example: '', message_encoded_verification: '', message_encoded_example: '',
            message_encoded_attenuation: '', message_encoded: '', message_privateKey: '', message_privateKey_own_verification: '', 
            message_privateKey_attenuation: '',copied:false,
            //rule states
            head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "",
            rules: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
            rule_adding_message: "", rule_counter: 0, number_of_added_rules_head: 0, number_of_added_rules_ids: 0, rule_body: [], rule_predicate_adding: "",
            rule_idx: 1, hidden_msg_predicate: "", rule_predicate_deleting: "",

            //fact states
            fact_head_name: "", fact_head_parameters: [{ param: "", type: "" }],
            facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
            fact_adding_message: "", fact_counter: 0, number_of_added_fact: 0,
            //caveat states
            caveat_head_parameter: [{ param: "", type: "" }], caveat_ids_parameter: [{ param: "", type: "" }], caveat_head_name: "", caveat_ids_name: "",
            caveats: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
            caveat_adding_message: "", caveat_counter: 0, number_of_added_caveats_head: 0, number_of_added_caveats_ids: 0,
            caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1, caveat_hidden_msg_predicate: "", caveat_predicate_deleting: "",

        }

    }
    componentDidMount() {
        this.loadWasm();
    }
    // componentDidUpdate(){
    //     setTimeout(() => this.setState({rule_adding_message:'',caveat_adding_message :'',fact_adding_message:''}), 10000);
    //   }
    loadWasm = async () => {
        try {
            const wasm = await import("biscuit-wasm");

            this.setState({ wasm, });

        } catch (err) {
            console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
        }
    };
    handleChange = (e) => {
        if (["head_parameter form-control"].includes(e.target.className)) {
            let head_parameter = [...this.state.head_parameter]
            head_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ head_parameter: head_parameter }, () => console.log(this.state.head_parameter))
        } else if (["ids_parameter form-control"].includes(e.target.className)) {
            let ids_parameter = [...this.state.ids_parameter]
            ids_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ ids_parameter: ids_parameter }, () => console.log(this.state.ids_parameter))
        }
        else if (["ids_parameter_type form-control"].includes(e.target.className)) {

            let ids_parameter = [...this.state.ids_parameter]
            ids_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ ids_parameter: ids_parameter }, () => console.log(this.state.ids_parameter))
        }
        else if (["head_parameter_type form-control"].includes(e.target.className)) {
            let head_parameter = [...this.state.head_parameter]
            head_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ head_parameter: head_parameter }, () => console.log(this.state.head_parameter))
        }
        else if (["head_name form-control"].includes(e.target.className)) {
            this.setState({ head_name: e.target.value }, () => console.log(this.state.head_name))

        }

        else if (["ids_name form-control"].includes(e.target.className)) {
            this.setState({ ids_name: e.target.value }, () => console.log(this.state.ids_name))
        }


        else if (["caveat_head_parameter form-control"].includes(e.target.className)) {
            let caveat_head_parameter = [...this.state.caveat_head_parameter]
            caveat_head_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ caveat_head_parameter: caveat_head_parameter }, () => console.log(this.state.caveat_head_parameter))
        } else if (["caveat_ids_parameter form-control"].includes(e.target.className)) {
            let caveat_ids_parameter = [...this.state.caveat_ids_parameter]
            caveat_ids_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ caveat_ids_parameter: caveat_ids_parameter }, () => console.log(this.state.caveat_ids_parameter))
        }
        else if (["caveat_ids_parameter_type form-control"].includes(e.target.className)) {

            let caveat_ids_parameter = [...this.state.caveat_ids_parameter]
            caveat_ids_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ caveat_ids_parameter: caveat_ids_parameter }, () => console.log(this.state.caveat_ids_parameter))
        }
        else if (["caveat_head_parameter_type form-control"].includes(e.target.className)) {
            let caveat_head_parameter = [...this.state.caveat_head_parameter]
            caveat_head_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ caveat_head_parameter: caveat_head_parameter }, () => console.log(this.state.caveat_head_parameter))
        }
        else if (["caveat_head_name form-control"].includes(e.target.className)) {
            this.setState({ caveat_head_name: e.target.value }, () => console.log(this.state.caveat_head_name))

        }
        else if (["caveat_ids_name form-control"].includes(e.target.className)) {
            this.setState({ caveat_ids_name: e.target.value }, () => console.log(this.state.caveat_ids_name))
        }

        else if (["fact_head_name form-control"].includes(e.target.className)) {
            this.setState({ fact_head_name: e.target.value }, () => console.log(this.state.fact_head_name))
        }
        else if (["fact_parameter form-control"].includes(e.target.className)) {
            let fact_head_parameters = [...this.state.fact_head_parameters]
            fact_head_parameters[e.target.dataset.id].param = e.target.value
            this.setState({ fact_head_parameters: fact_head_parameters }, () => console.log(this.state.fact_head_parameters))
        }
        else if (["fact_parameter_type form-control"].includes(e.target.className)) {
            let fact_head_parameters = [...this.state.fact_head_parameters]
            fact_head_parameters[e.target.dataset.id].type = e.target.value
            this.setState({ fact_head_parameters: fact_head_parameters }, () => console.log(this.state.fact_head_parameters))
        }


    }

    handleChangee = (e) => {
        let serialized = this.state.token;
        let b64 = btoa(String.fromCharCode(...serialized));

        this.setState({ valueEncoded: b64, valueDecoded: e.target.value });
    }
    copy() {
        this.setState({copied:true})
        const el = this.textArea
        el.select()
        document.execCommand("copy")
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
    handleChange_privateKey = (e) => {
        const { wasm = {} } = this.state;
        try {
            this.setState({ message_privateKey: "" })

            let privkey = new Uint8Array(32);
            let pubkey = new Uint8Array(32);
            let decoded = fromHex(e.target.value);
            let keypair = wasm.KeyPair.fromBytes(decoded);


            let publicKey = keypair.publicKey();

            keypair.toBytes(privkey);
            publicKey.toBytes(pubkey);

            this.setState({ privateKey: toHex(privkey), publicKey: toHex(pubkey) });
        }
        catch (err) {

            this.setState({ privateKey: e.target.value })

            this.setState({ message_privateKey: "enter a valid key !" })
        }
    }

    handleChangee_example = (e) => {
        let serialized = this.state.token_example;
        let b64 = btoa(String.fromCharCode(...serialized));

        this.setState({ valueEncoded_example: b64, valueDecoded_example: e.target.value });
    }
    handleChange1_example = (e) => {
        const { wasm = {} } = this.state;
        try {
            this.setState({ message_encoded_example: "" })

            let data = new Uint8Array(atob(e.target.value).split("").map(function (c) {
                return c.charCodeAt(0);
            }));
            let token = wasm.Biscuit.from(data);
            this.setState({ token_example: token.toVec(), valueEncoded_example: e.target.value, valueDecoded_example: token.print(), message_encoded_example: "" });
        }
        catch (err) {
            this.setState({ valueEncoded_example: e.target.value })
            this.setState({ message_encoded_example: "Enter a valid token !" })
        }

    }

    handleChange2 = (e) => {


        this.setState({ restrict: e.target.value });
    }
    handleChange3 = (e) => {


        this.setState({ resource: e.target.value });
    }

    handleChange4 = (e) => {


        this.setState({ resource_verify: e.target.value });
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
    handleChange6 = (e) => {


        this.setState({ seconds: e.target.value });
    }
    delPredicate_rule = async (e) => {
        this.setState({ rule_predicate_deleting: "" })
        try {
            console.log("in predicate rule body", this.state.rule_body);


            if (this.state.rule_body.length === 0) {
                throw (SyntaxError("You don't have any predicate to delete !"))

            }
            else if (this.state.rule_body.length === 1) {
                this.setState({ rule_body: [], rule_predicate_deleting: "Your last predicate has been deleted" , rule_predicate_adding: ""})
            }
            else {
                let n = [...this.state.rule_body.splice(this.state.rule_body.length - 1, 1)]
                console.log("in predicate rule body", n);

                this.setState((prevState) => ({

                    rule_body: [...n], rule_predicate_deleting: "Your last predicate has been deleted",rule_predicate_adding: ""

                }));
                await new Promise(r => setTimeout(r, 3000));
                console.log("last rule body", this.state.rule_body)

            }
        }
        catch (e) {
            this.setState({ rule_predicate_deleting: e.message })
        }
    }

    delPredicate_caveat = async (e) => {
        this.setState({ caveat_predicate_deleting: "" })
        try {
            console.log("in predicate caveat body", this.state.caveat_body);


            if (this.state.caveat_body.length === 0) {
                throw (SyntaxError("You don't have any predicate to delete !"))

            }
            else if (this.state.caveat_body.length === 1) {
                this.setState({ caveat_body: [], caveat_predicate_deleting: "Your last predicate has been deleted",caveat_predicate_adding: "" })
            }
            else {
                let n = [...this.state.caveat_body.splice(this.state.caveat_body.length - 1, 1)]
                console.log("in predicate caveat body", n);

                this.setState((prevState) => ({

                    caveat_body: [...n], caveat_predicate_deleting: "Your last predicate has been deleted",caveat_predicate_adding: ""

                }));
                await new Promise(r => setTimeout(r, 3000));
                console.log("last caveat body", this.state.caveat_body)

            }
        }
        catch (e) {
            this.setState({ caveat_predicate_deleting: e.message })
        }
    }
    addPredicate_rule = async (e) => {
        this.setState({ rule_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));
        console.log(this.state.number_of_added_rules_ids)
        try {
            console.log("in predicate rule body", this.state.rule_body);

            for (let pas = 0; pas < this.state.ids_parameter.length; pas++) {
                console.log("ids parameter counter", this.state.ids_parameter.length)
                if (this.state.ids_name === "" || this.state.ids_parameter[pas].param === "" || this.state.ids_parameter[pas].type === "") {
                    throw (SyntaxError("all predicate fields must be filled out"))

                }
            }

            if (this.state.rule_body.length === 0) {
                this.setState({
                    rule_body: [{ ids_name: this.state.ids_name, rule_ids_parameter: this.state.ids_parameter }], ids_name: "", ids_parameter: [{ param: "", type: "" }], rule_predicate_adding: "your predicate has been added", rule_idx: this.state.rule_idx + 1, hidden_msg_predicate: "Your added predicates :",

                })
                await new Promise(r => setTimeout(r, 1000));

            }
            else {

                this.setState((prevState) => ({

                    rule_body: [...this.state.rule_body, { ids_name: this.state.ids_name, rule_ids_parameter: this.state.ids_parameter }], ids_name: "", ids_parameter: [{ param: "", type: "" }], rule_predicate_adding: "your predicate has been added", rule_idx: this.state.rule_idx + 1, hidden_msg_predicate: "Your added predicates :"


                }));
            }
        }
        catch (e) {
            this.setState({ rule_predicate_adding: e.message })
        }
    }
    addPredicate_caveat = async (e) => {
        this.setState({ caveat_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));
        try {
            for (let pas = 0; pas < this.state.caveat_ids_parameter.length; pas++) {
                if (this.state.caveat_ids_name === "" || this.state.caveat_ids_parameter[pas].param === "" || this.state.caveat_ids_parameter[pas].type === "") {
                    throw (SyntaxError("all predicate fields must be filled out"))

                }
            }

            if (this.state.caveat_body.length === 0) {
                this.setState({
                    caveat_body: [{ ids_name: this.state.caveat_ids_name, caveat_ids_parameter: this.state.caveat_ids_parameter }], caveat_ids_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1, caveat_hidden_msg_predicate: "Your added predicates :"

                })
                await new Promise(r => setTimeout(r, 1000));

            }
            else {
                this.setState((prevState) => ({

                    caveat_body: [...prevState.caveat_body, { ids_name: this.state.caveat_ids_name, caveat_ids_parameter: this.state.caveat_ids_parameter }], caveat_ids_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1, caveat_hidden_msg_predicate: "Your added predicates :"
                }));
            }

        }
        catch (e) {
            this.setState({ caveat_predicate_adding: e.message })
        }
    }
    addFact = async (e) => {

        this.setState((prevState) => ({
            fact_head_parameters: [...prevState.fact_head_parameters, { param: "", type: "" }], number_of_added_fact: this.state.number_of_added_fact + 1
        }));

    }
    addRule1_caveat = (e) => {
        this.setState((prevState) => ({
            caveat_ids_parameter: [...prevState.caveat_ids_parameter, { param: "", type: "" }], number_of_added_caveats_ids: this.state.number_of_added_caveats_ids + 1,
        }));
    }
    addRule_caveat = (e) => {
        this.setState((prevState) => ({
            caveat_head_parameter: [...prevState.caveat_head_parameter, { param: "", type: "" }], number_of_added_caveats_head: this.state.number_of_added_caveats_head + 1,
        }));
    }

    addRule1 = (e) => {
        this.setState((prevState) => ({
            ids_parameter: [...prevState.ids_parameter, { param: "", type: "" }], number_of_added_rules_ids: this.state.number_of_added_rules_ids + 1
        }));
    }
    addRule = (e) => {
        this.setState((prevState) => ({
            head_parameter: [...prevState.head_parameter, { param: "", type: "" }], number_of_added_rules_head: this.state.number_of_added_rules_head + 1
        }));
    }

    render() {
        const { wasm = {} } = this.state;
        const loadKeys = () => {
            let decoded = fromHex(this.state.privateKey);
            return wasm.KeyPair.fromBytes(decoded);
        }
        const btnText = this.state.copied ? 'Copied' : 'Copy to clipboard'


        let head_parameter = [...this.state.head_parameter]
        let caveat_head_parameter = [...this.state.caveat_head_parameter]
        let fact_head_parameters = [...this.state.fact_head_parameters]
        let ids_parameter = [...this.state.ids_parameter]
        let caveat_ids_parameter = [...this.state.caveat_ids_parameter]

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
                    </div>                    <h1 className="mr-5 text-center">Token Generation </h1>

                    <br />
                    <h2 className="mr-5 ml-5">Root Keys Generation </h2>
                    <div className="mr-5 ml-5">Biscuits use public key cryptography. You can either use an existing public/private keypair, or we'll generate one for you.<br /> Please note this site does not record neither the provided keys nor the generated tokens. </div>
                    <br />
                    <div className="container-fluid mt-12">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Public Key</h5></label> <small> press the button to generate your keys</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" readOnly value={this.state.publicKey} rows="2" />
                                </div>



                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label className="exampleFormControlTextarea1"><h5>Private Key</h5></label><small> if you wanna use your private key paste it here</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" type="text" value={this.state.privateKey} onChange={this.handleChange_privateKey} rows="2" />
                                </div>
                                <button
                                    onClick={async () => {
                                        this.setState({ message_privateKey: "" })

                                        let privkey = new Uint8Array(32);
                                        let pubkey = new Uint8Array(32);

                                        let keypair = new wasm.KeyPair();
                                        let publicKey = keypair.publicKey();

                                        keypair.toBytes(privkey);
                                        publicKey.toBytes(pubkey);

                                        this.setState({ privateKey: toHex(privkey), publicKey: toHex(pubkey) });



                                    }}>
                                    Generate keys
                                </button>
                                <div>{this.state.message_privateKey}</div>

                            </div>

                        </div>

                    </div>


                    <br />
                    <h1 className="mr-5 ml-5">Generate Your Own Token </h1>
                    <div className="mr-5 ml-5">You"ll now learn how to create the different components (facts, rules, caveats) of a biscuit token, from scratch</div>

                    <br />
                    <div className="container-fluid mt-10" onChange={this.handleChange}>
                        <div className="row">

                            <div className="col-4 ml-5 mr-5">
                                <h2>add a new authority fact</h2>

                            </div>
                        </div>
                        <div className="ml-5 mr-5">
                            Authority facts can only be created in the authority block, either directly or from rules, and are represented by the #authority symbol as the first element of a fact.<br /> <strong>They hold the initial rights for the token</strong> .
                           <br /> it's a predicate which looks like Predicate(v0, v1, ..., vn) : Predicate si the fact name and v0,v1,...,vn are the fact parameters<br />

                        </div>
                        <div className="row">

                            <div className="col-1 ml-5 mr-2">
                                <div className="row">
                                    <label >{`fact name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.fact_head_name}
                                        className="fact_head_name form-control"
                                        id="fact-head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <FactParamInput rules={fact_head_parameters}
                                type="text"

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addFact} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>

                        </div>

                        <br />
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-0  ">
                                <button className="col-12" onClick={async () => {
                                    try {

                                        this.setState({ fact_adding_message: '' });
                                        for (let pas = 0; pas < this.state.fact_head_parameters.length; pas++) {
                                            if (this.state.fact_head_name === "" || this.state.fact_head_parameters[pas].param === "" || this.state.fact_head_parameters[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        if (this.state.fact_counter === 0) {
                                            console.log("number of facts", this.state.number_of_added_fact);
                                           

                                            this.setState({
                                                facts: [{ fact_head_parameters: this.state.fact_head_parameters, fact_head_name: this.state.fact_head_name, }]
                                            });
                                        }
                                        else {
                                            
                                            this.setState((prevState) => ({
                                                facts: [...prevState.facts, { fact_head_parameters: this.state.fact_head_parameters, fact_head_name: this.state.fact_head_name, }]
                                            }));

                                        }
                                        this.setState({ fact_head_name: "", fact_head_parameters: [{ param: "", type: "" }] })

                                        this.setState({ fact_adding_message: "Your new fact has been added" });

                                        this.setState({ fact_counter: this.state.fact_counter + 1 })

                                    }
                                    catch (e) {

                                        this.setState({ fact_adding_message: e.message })

                                    }

                                }}>Add fact</button>
                            </div>
                            <div className="col-2 ml-3">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({



                                            fact_head_name: "", fact_head_parameters: [{ param: "", type: "" }],
                                            
                                            fact_adding_message: "", 
                                        })





                                    }}>Reset fact</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="fact_adding_result">{this.state.fact_adding_message}</div>

                            </div>
                        </div>
                        <br />
                        <div className="row">

                            <div className="col-3 ml-5 mr-5">
                                <h2>Add a new rule</h2>

                            </div>

                        </div>
                        <div className="ml-5 mr-5">A rule is a comination of predicates pid1 ,pid2 ,etc.that will generate a new fact corresponding to the head.</div>
                        <div className="mr-5 ml-5">The rule looks like this (with a head part on the left and a body part on the right) :  <pre>{'head(h1,h2,...) <- pid1(p1_1,p1_2...), pid2(p2_1,p2_2, ...)'}</pre> </div>


                        <div className="ml-5">For more details and some explained examples of rules click <a href="https://www.w3schools.com/">here</a> to check our documentation</div>

                        <br />


                        <div className="ml-5"><h3>Header (left part of the rule)</h3></div>
                        <div className="ml-5">The header is a Predicate composed from a name ( head ) and  some parameters (at least h1).</div>
                        <div className="ml-5"> The + allows you to add other parameters (h2,h3,etc.)</div>
                        <div className="row"></div>
                        <div className="row">

                            <div className="col-1 ml-5 mr-2 ">
                                <div className="row">
                                    <label >{`head name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.head_name}
                                        className="head_name form-control"
                                        id="head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <HeadInput rules={head_parameter}
                                type="text"

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addRule} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>
                        </div>

                        <br />
                        <div className="ml-5"><h3>Body : the part on the left</h3></div>
                        <div className="ml-5">The body may be decomposed into several predicates(pid1,pid2,etc).</div>
                        <div className="ml-5">Each body predicate is composed of its identifier id (e.g. pid1) and one or several parameters (e.g. p1_1).</div>
                        <div className="ml-5">Click <a href="https://www.w3schools.com/">here</a> for more details and explained examples.</div>

                        <div className="ml-5">You may either add a parameter (e.g. p1_2) with the button + , or add a new body predicate (e.g. pid2 ) using the "add predicate" button.</div>
                        <h5 className="ml-5">{this.state.hidden_msg_predicate}</h5>

                        <ShowPredicate predicates={this.state.rule_body} />

                        <div className="row">
                            <div className="col-1 ml-5">
                                <div className="row">
                                    <label >{`pid${this.state.rule_idx} `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.ids_name}
                                        className="ids_name form-control"
                                    />

                                </div>
                            </div>

                            <HeadInput1 rules={ids_parameter} rule_idx={this.state.rule_idx}
                                type="text"
                                value={this.state.ids_parameter}
                                className="ids_parameter"


                            />
                            <div className="col-0 mr-2">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >
                                    <h3>
                                        <IconButton onClick={this.addRule1} >
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

                                    <button onClick={this.addPredicate_rule} >
                                        Add predicate
                                        </button>
                                    <div>{this.state.rule_predicate_adding}</div>





                                </div>
                            </div>
                            <div className="col-1 ml-1">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >


                                    <button onClick={this.delPredicate_rule} >
                                        Delete last predicate
                                    </button>
                                    <div>{this.state.rule_predicate_deleting}</div>




                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-0 ml-1">
                                <div className="row">
                                    <button onClick={async () => {
                                        try {
                                            this.setState({ rule_adding_message: '' })
                                            for (let pas = 0; pas < this.state.head_parameter.length; pas++) {
                                                if (this.state.head_name === "" || this.state.head_parameter[pas].param === "" || this.state.head_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }

                                            if (this.state.rule_counter === 0) {

                                                if (this.state.rule_body.length === 0) {
                                                    throw (SyntaxError("You must at least add one predicate"))
                                                }

                                                this.setState({
                                                    rules: [{ head_parameter: this.state.head_parameter, head_name: this.state.head_name, body: this.state.rule_body }]
                                                });
                                            }
                                            else {

                                                if (this.state.rule_body.length === 0) {
                                                    throw (SyntaxError("You must at least add one predicate !"))
                                                }



                                                this.setState((prevState) => ({
                                                    rules: [...prevState.rules, { head_parameter: this.state.head_parameter, head_name: this.state.head_name, body: this.state.rule_body }]
                                                }));
                                            }

                                            this.setState({ rule_adding_message: "Your new rule has been added", });
                                            this.setState({ rule_predicate_adding: '' });
                                            this.setState({ rule_counter: this.state.rule_counter + 1 })
                                            this.setState({ head_parameter: [{ param: "", type: "" }], head_name: '', rule_idx: 1, body: [], rule_body: [] })


                                        }
                                        catch (e) {
                                            this.setState({ rule_adding_message: e.message })
                                        }





                                    }}>Add rule</button>
                                </div>
                            </div>
                            <div className="col-2 ml-3">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({



                                            head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "",

                                            rule_adding_message: "Your rule has been resetted ", rule_body: [], rule_predicate_adding: "", rule_idx: 1, hidden_msg_predicate: "", rule_predicate_deleting: "",

                                        })





                                    }}>Reset rule</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="rule_adding_result">{this.state.rule_adding_message}</div>

                            </div>
                        </div>

                    </div>
                    <br />
                    <div className="container-fluid mt-10" onChange={this.handleChange}>

                        <div className="row">

                            <div className="col-3 ml-5 mr-5">
                                <h2>Add a new caveat</h2>

                            </div>

                        </div>
                        <div className="row">
                            <div className="mr-5 ml-5">Caveats are logic queries evaluating conditions on authority and ambient facts. To validate an operation, all of a token's caveats must succeed.</div>
                            <div className="mr-5 ml-5">The caveat have the same structure as the rule.</div>

                        </div>
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
                                        value={this.state.caveat_head_name}
                                        className="caveat_head_name form-control"
                                        id="head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <HeadInputCaveat rules={caveat_head_parameter} head_names={this.state.caveat_head_namee}
                                type="text"

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row ml-1">

                                    <IconButton onClick={this.addRule_caveat} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="ml-5"><h4>Body</h4></div>
                        <h5 className="ml-5">{this.state.caveat_hidden_msg_predicate}</h5>

                        <ShowPredicateCaveat predicates={this.state.caveat_body} />

                        <div className="row ">
                            <div className="col-1 mr-2 ml-5">
                                <div className="row">
                                    <label >{`pid${this.state.caveat_idx} `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.caveat_ids_name}
                                        className="caveat_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <HeadInput1Caveat rules={caveat_ids_parameter} caveat_idx={this.state.caveat_idx}
                                head_names={this.state.caveat_head_namee}
                                type="text"
                                value={this.state.ids_parameter}
                                className="caveat_ids_parameter"


                            />
                            <div className="col-0 mr-3">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row ml-1" >
                                    <h3>
                                        <IconButton onClick={this.addRule1_caveat} >
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
                                        Add predicate
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


















                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-0 ">
                                <button onClick={async () => {
                                    try {
                                        this.setState({ caveat_adding_message: '' })
                                        for (let pas = 0; pas < this.state.caveat_head_parameter.length; pas++) {
                                            if (this.state.caveat_head_name === "" || this.state.caveat_head_parameter[pas].param === "" || this.state.caveat_head_parameter[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        if (this.state.caveat_counter === 0) {


                                            if (this.state.caveat_body.length === 0) {
                                                throw (SyntaxError("You must at least add one predicate !"))
                                            }
                                            // for (let pas = 0; pas < this.state.number_of_added_caveats_ids + 1; pas++) {
                                            //     if (this.state.caveat_ids_name === "" || this.state.caveat_ids_parameter[pas].param === "" || this.state.caveat_ids_parameter[pas].type === "") {
                                            //         throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            //     }
                                            // }
                                            console.log(this.state.head_name);
                                            this.setState({
                                                caveats: [{ head_parameter: this.state.caveat_head_parameter, head_name: this.state.caveat_head_name, body: this.state.caveat_body }]
                                            });
                                            await new Promise(r => setTimeout(r, 2000));
                                            console.log("caveats", this.state.caveats);
                                        }
                                        else {
                                            console.log("here", this.state.number_of_added_caveats_head)


                                            if (this.state.caveat_body.length === 0) {
                                                throw (SyntaxError("You must at least add one predicate !"))
                                            }
                                            // for (let pas = 1; pas <= this.state.number_of_added_caveats_ids; pas++) {
                                            //     if (this.state.caveat_ids_name === "" || this.state.caveat_ids_parameter[this.state.caveat_ids_parameter.length - pas].param === "" || this.state.caveat_ids_parameter[this.state.caveat_ids_parameter.length - pas].type === "") {
                                            //         throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            //     }
                                            // }



                                            this.setState((prevState) => ({
                                                caveats: [...prevState.caveats, { head_parameter: this.state.caveat_head_parameter, head_name: this.state.caveat_head_name, body: this.state.caveat_body }]
                                            }));
                                            await new Promise(r => setTimeout(r, 2000));
                                            console.log("caveats", this.state.caveats);
                                        }
                                        this.setState({ caveat_adding_message: "Your new ceveat has been added" });

                                        this.setState({ caveat_counter: this.state.rule_counter + 1 })
                                        this.setState({ caveat_head_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_head_parameter: [{ param: "", type: "" }], caveat_ids_name: "" })
                                        this.setState({ caveat_head_name: "", caveat_head_parameter: [{ param: "", type: "" }], caveat_idx: 1, body: [], caveat_body: [] })
                                    }
                                    catch (e) {
                                        this.setState({ caveat_adding_message: e.message })
                                    }


                                }}>Add caveat</button>
                            </div>
                            <div className="col-1 ml-1">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({

                                            caveat_head_parameter: [{ param: "", type: "" }], caveat_ids_parameter: [{ param: "", type: "" }], caveat_head_name: "", caveat_ids_name: "",
                                            caveat_adding_message: "", number_of_added_caveats_head: 0, number_of_added_caveats_ids: 0,
                                            caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1, caveat_hidden_msg_predicate: "", caveat_predicate_deleting: "",



                                        })





                                    }}>Reset caveat</button>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="caveat_adding_result">{this.state.caveat_adding_message}</div>

                            </div>
                        </div>

                        <br /> <br />
                        <br />
                        <div className="container-fluid mt-10">
                            <div className="row">
                                <div className="col-md-5 ml-5">
                                    <div className="textarea-container">
                                        <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label> <small> paste a token here</small>
                                        <textarea ref={(textarea) => this.textArea = textarea} className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.valueEncoded} onChange={this.handleChange1} rows="15" />
                                        <a onClick={() => this.copy()}>{btnText}</a>

                                    </div>
                                    <div>{this.state.message_encoded}</div>
                                </div>
                                <div className="col-md-5 ml-5">
                                    <div className="form-group brown-border-focus">
                                        <label htmlFor="exampleFormControlTextarea1"><h5>DECODED</h5></label><small> your result</small>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" readOnly type="text" value={this.state.valueDecoded} onChange={this.handleChangee} rows="15" />
                                    </div>


                                    <div id="generation_result">{this.state.gen_err_empty}</div>


                                </div>
                            </div>
                        </div>
                        <div className="mr-5 ml-5">In order to create your first token add your rules , fact and caveat , then click on the generate button</div>
                        <br />
                        <div className="row">
                            <div className="col-4">

                            </div>
                            <div className="col-2 ml-5">
                                <button onClick={async () => {
                                    this.setState({ gen_err: '' })

                                    let builder = new wasm.Biscuit();
                                    console.log("rule counter :", this.state.rule_counter);
                                    if (this.state.rule_counter > 0) {

                                        for (let pas = 0; pas < this.state.rules.length; pas++) {
                                            console.log("step {}", pas);
                                            let head_parameter1 = [...this.state.rules[pas].head_parameter];
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
                                                    head_parameter = [...head_parameter, { integer : parseInt(head_parameter1[pas1].param) }]
                                                }
                                                else if (head_parameter1[pas1].type === "date") {
                                                    head_parameter = [...head_parameter, { date : Date.parse(head_parameter1[pas1].param) }]
                                                }

                                            }
                                            // console.log(head_parameter)
                                            let body = [...this.state.rules[pas].body];
                                            let body_for_rule = [];
                                            for (let pas1 = 0; pas1 < body.length; pas1++) {
                                                let ids_name = body[pas1].ids_name
                                                let ids_parameters = [...body[pas1].rule_ids_parameter]
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
                                                        ids_parameter_for_rule = [...ids_parameter_for_rule, { date : Date.parse(ids_parameters[pas2].param) }]
                                                    }
                                                }
                                                body_for_rule = [...body_for_rule, {
                                                    name: ids_name,
                                                    ids: ids_parameter_for_rule
                                                }]
                                            }
                                            console.log("body_for_rule", body_for_rule);


                                            let rule = wasm.rule(
                                                this.state.rules[pas].head_name,
                                                head_parameter,
                                                body_for_rule
                                            )
                                            console.log("authority rule ", rule)
                                            builder.addAuthorityRule(rule);
                                        }
                                    }
                                    console.log("fact counter :", this.state.fact_counter);
                                    if (this.state.fact_counter > 0) {
                                        for (let pas = 0; pas < this.state.facts.length; pas++) {

                                            let fact_parameter1 = [...this.state.facts[pas].fact_head_parameters];
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
                                                else if (fact_parameter1[pas1].type === "date") {
                                                    fact_parameter = [...fact_parameter, { date : Date.parse(fact_parameter1[pas1].param) }]
                                                }
                                                else if (fact_parameter1[pas1].type === "integer") {
                                                    fact_parameter = [...fact_parameter, { integer : parseInt(fact_parameter1[pas1].param) }]
                                                }
                                            }
                                            let fact = wasm.fact(
                                                this.state.facts[pas].fact_head_name,
                                                fact_parameter,

                                            )
                                            builder.addAuthorityFact(fact);


                                        }

                                    }
                                    console.log("caveat counter :", this.state.caveat_counter);
                                    if (this.state.caveat_counter > 0) {
                                        for (let pas = 0; pas < this.state.caveats.length; pas++) {
                                            console.log("step {}", pas);
                                            let head_parameter1 = [...this.state.caveats[pas].head_parameter];
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
                                                else if (head_parameter1[pas1].type === "date") {
                                                    head_parameter = [...head_parameter, { date: Date.parse(head_parameter1[pas1].param) }]
                                                }
                                                else if (head_parameter1[pas1].type === "integer") {
                                                    head_parameter = [...head_parameter, { integer: parseInt(head_parameter1[pas1].param) }]
                                                }
                                                
                                            }
                                            // console.log(head_parameter)
                                            let body = [...this.state.caveats[pas].body];
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
                                                    else if(ids_parameters[pas2].type === "date")
                                                    {
                                                        ids_parameter_for_rule = [...ids_parameter_for_rule, { date : Date.parse(ids_parameters[pas2].param)  }]

                                                    }
                                                    else if(ids_parameters[pas2].type === "integer")
                                                    {
                                                        ids_parameter_for_rule = [...ids_parameter_for_rule, { integer : parseInt(ids_parameters[pas2].param) }]

                                                    }
                                                }
                                                body_for_rule = [...body_for_rule, {
                                                    name: ids_name,
                                                    ids: ids_parameter_for_rule
                                                }]
                                            }
                                            console.log("body_for_rule", body_for_rule);


                                            let rule = wasm.rule(
                                                this.state.caveats[pas].head_name,
                                                head_parameter,
                                                body_for_rule
                                            )
                                            builder.addAuthorityCaveat(rule);
                                        }
                                    }




                                    try {
                                        let token = builder.build(loadKeys())
                                        let serialized = token.toVec();
                                        let b64 = btoa(String.fromCharCode(...serialized));

                                        this.setState({ token: token.toVec(), valueEncoded: b64, valueDecoded: token.print() });
                                        this.setState({
                                            //rule states
                                            head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "",
                                            rules: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
                                            rule_adding_message: "", rule_counter: 0, number_of_added_rules_head: 0, number_of_added_rules_ids: 0, rule_body: [], rule_predicate_adding: "", rule_idx: 1,

                                            //fact states
                                            fact_head_name: "", fact_head_parameters: [{ param: "", type: "" }],
                                            facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
                                            fact_adding_message: "", fact_counter: 0, number_of_added_fact: 0,
                                            //caveat states
                                            caveat_head_parameter: [{ param: "", type: "" }], caveat_ids_parameter: [{ param: "", type: "" }], caveat_head_name: "", caveat_ids_name: "",
                                            caveats: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
                                            caveat_adding_message: "", caveat_counter: 0, number_of_added_caveats_head: 0, number_of_added_caveats_ids: 0,
                                            caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1,
                                        })
                                    } catch (error) {
                                        this.setState({ gen_err: "You must generate your keypair before generating your token !" });
                                    }

                                }}

                                > Generate your new token </button>
                                <div id="verification_result">{this.state.gen_err}</div>

                            </div>
                        </div>
                    </div>







                </div >
            </div>
        )
    }
}
export default TokenGen;


