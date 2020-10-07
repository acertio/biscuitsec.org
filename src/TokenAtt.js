import React from 'react'

import HeadInputAttenuation from "./HeadInputAttenuation"
import HeadInput1Attenuation from "./HeadInput1Attenuation"
import FactParamInputAttenuation from "./FactParamInputAttenuation"
import CaveatInputAttenuation from "./CaveatInputAttenuation";
import CaveatInput1Attenuation from "./CaveatInput1Attenuation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShowPredicate from './ShowPredicate'
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
            //rule attenuation states
            attenuation_head_parameter: [{ param: "", type: "" }], attenuation_ids_parameter: [{ param: "", type: "" }], attenuation_head_name: "", attenuation_ids_name: "",
            attenuation_rules: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
            attenuation_rule_adding_message: "", attenuation_rule_counter: 0,
            attenuation_number_of_added_rules_head: 0, attenuation_number_of_added_rules_ids: 0, rule_body: [],
            rule_predicate_adding: "", rule_idx: 1, rule_predicate_deleting: "",
            //fact attenuation states
            attenuation_fact_head_name: "", attenuation_fact_head_parameters: [{ param: "", type: "" }],
            attenuation_facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
            attenuation_fact_adding_message: "", attenuation_fact_counter: 0, attenuation_number_of_added_fact: 0,
            //caveat attenuation states
            attenuation_caveat_head_parameter: [{ param: "", type: "" }], attenuation_caveat_ids_parameter: [{ param: "", type: "" }], attenuation_caveat_head_name: "", attenuation_caveat_ids_name: "",
            attenuation_caveats: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
            attenuation_caveat_adding_message: "", attenuation_caveat_counter: 0, attenuation_number_of_added_caveats_head: 0, attenuation_number_of_added_caveats_ids: 0, caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1,caveat_predicate_deleting: ""
            ,copied:false,
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

        if (["attenuation_head_parameter form-control"].includes(e.target.className)) {
            let attenuation_head_parameter = [...this.state.attenuation_head_parameter]
            attenuation_head_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ attenuation_head_parameter: attenuation_head_parameter }, () => console.log(this.state.attenuation_head_parameter))
        } else if (["attenuation_ids_parameter form-control"].includes(e.target.className)) {
            let attenuation_ids_parameter = [...this.state.attenuation_ids_parameter]
            attenuation_ids_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ attenuation_ids_parameter: attenuation_ids_parameter }, () => console.log(this.state.attenuation_ids_parameter))
        }
        else if (["attenuation_ids_parameter_type form-control"].includes(e.target.className)) {

            let attenuation_ids_parameter = [...this.state.attenuation_ids_parameter]
            attenuation_ids_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ attenuation_ids_parameter: attenuation_ids_parameter }, () => console.log(this.state.attenuation_ids_parameter))
        }
        else if (["attenuation_head_parameter_type form-control"].includes(e.target.className)) {
            let attenuation_head_parameter = [...this.state.attenuation_head_parameter]
            attenuation_head_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ attenuation_head_parameter: attenuation_head_parameter }, () => console.log(this.state.attenuation_head_parameter))
        }
        else if (["attenuation_head_name form-control"].includes(e.target.className)) {
            this.setState({ attenuation_head_name: e.target.value }, () => console.log(this.state.attenuation_head_name))

        }
        else if (["attenuation_ids_name form-control"].includes(e.target.className)) {
            this.setState({ attenuation_ids_name: e.target.value }, () => console.log(this.state.attenuation_ids_name))
        }
        else if (["attenuation_caveat_head_parameter form-control"].includes(e.target.className)) {
            let attenuation_caveat_head_parameter = [...this.state.attenuation_caveat_head_parameter]
            attenuation_caveat_head_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ attenuation_caveat_head_parameter: attenuation_caveat_head_parameter }, () => console.log(this.state.attenuation_caveat_head_parameter))
        } else if (["attenuation_caveat_ids_parameter form-control"].includes(e.target.className)) {
            let attenuation_caveat_ids_parameter = [...this.state.attenuation_caveat_ids_parameter]
            attenuation_caveat_ids_parameter[e.target.dataset.id].param = e.target.value
            this.setState({ attenuation_caveat_ids_parameter: attenuation_caveat_ids_parameter }, () => console.log(this.state.attenuation_caveat_ids_parameter))
        }
        else if (["attenuation_caveat_ids_parameter_type form-control"].includes(e.target.className)) {

            let attenuation_caveat_ids_parameter = [...this.state.attenuation_caveat_ids_parameter]
            attenuation_caveat_ids_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ attenuation_caveat_ids_parameter: attenuation_caveat_ids_parameter }, () => console.log(this.state.attenuation_caveat_ids_parameter))
        }
        else if (["attenuation_caveat_head_parameter_type form-control"].includes(e.target.className)) {
            let attenuation_caveat_head_parameter = [...this.state.attenuation_caveat_head_parameter]
            attenuation_caveat_head_parameter[e.target.dataset.id].type = e.target.value
            this.setState({ attenuation_caveat_head_parameter: attenuation_caveat_head_parameter }, () => console.log(this.state.attenuation_caveat_head_parameter))
        }
        else if (["attenuation_caveat_head_name form-control"].includes(e.target.className)) {
            this.setState({ attenuation_caveat_head_name: e.target.value }, () => console.log(this.state.attenuation_caveat_head_name))

        }
        else if (["attenuation_caveat_ids_name form-control"].includes(e.target.className)) {
            this.setState({ attenuation_caveat_ids_name: e.target.value }, () => console.log(this.state.attenuation_caveat_ids_name))
        }

        else if (["attenuation_fact_head_name form-control"].includes(e.target.className)) {
            this.setState({ attenuation_fact_head_name: e.target.value }, () => console.log(this.state.attenuation_fact_head_name))
        }
        else if (["attenuation_fact_parameter form-control"].includes(e.target.className)) {
            let attenuation_fact_head_parameters = [...this.state.attenuation_fact_head_parameters]
            attenuation_fact_head_parameters[e.target.dataset.id].param = e.target.value
            this.setState({ attenuation_fact_head_parameters: attenuation_fact_head_parameters }, () => console.log(this.state.attenuation_fact_head_parameters))
        }
        else if (["attenuation_fact_parameter_type form-control"].includes(e.target.className)) {
            let attenuation_fact_head_parameters = [...this.state.attenuation_fact_head_parameters]
            attenuation_fact_head_parameters[e.target.dataset.id].type = e.target.value
            this.setState({ attenuation_fact_head_parameters: attenuation_fact_head_parameters }, () => console.log(this.state.attenuation_fact_head_parameters))
        }


    }
    handleChangee = (e) => {
        let serialized = this.state.token;
        let b64 = btoa(String.fromCharCode(...serialized));

        this.setState({ valueEncoded: b64, valueDecoded: e.target.value });
    }
    handleChangee_attenuation = (e) => {
        let serialized = this.state.tokenToAttenuate;
        let b64 = btoa(String.fromCharCode(...serialized));

        this.setState({ valueEncodedToAttenuate: b64, valueDecodedToAttenuate: e.target.value });
    }
    handleChange1_attenuation = (e) => {
        const { wasm = {} } = this.state;
        try {
            let data = new Uint8Array(atob(e.target.value).split("").map(function (c) {
                return c.charCodeAt(0);
            }));
            let token = wasm.Biscuit.from(data);
            this.setState({ tokenToAttenuate: token.toVec(), valueEncodedToAttenuate: e.target.value, valueDecodedToAttenuate: token.print(), message_encoded_attenuation: "" });
        }
        catch (err) {
            this.setState({ valueEncodedToAttenuate: e.target.value })
            this.setState({ message_encoded_attenuation: "Enter a valid token !" })
        }
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
    handleChange_attenuation_privateKey = (e) => {
        const { wasm = {} } = this.state;
        try {
            this.setState({ message_privateKey_attenuation: "" })

            let privkey = new Uint8Array(32);
            let pubkey = new Uint8Array(32);
            let decoded = fromHex(e.target.value);
            let keypair = wasm.KeyPair.fromBytes(decoded);


            let publicKey = keypair.publicKey();

            keypair.toBytes(privkey);
            publicKey.toBytes(pubkey);

            this.setState({ attenuation_privateKey: toHex(privkey), attenuation_publicKey: toHex(pubkey) });
        }
        catch (err) {
            this.setState({ attenuation_privateKey: e.target.value })

            this.setState({ message_privateKey_attenuation: "enter a valid key !" })
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

    addFact = async (e) => {

        this.setState((prevState) => ({
            fact_head_parameters: [...prevState.fact_head_parameters, { param: "", type: "" }], number_of_added_fact: this.state.number_of_added_fact + 1
        }));

    }
    delPredicate_rule = async (e) => {
        this.setState({ rule_predicate_deleting: "" })
        try {
            console.log("in predicate rule body", this.state.rule_body);


            if (this.state.rule_body.length === 0) {
                throw (SyntaxError("You don't have any predicate to delete !"))

            }
            else if (this.state.rule_body.length === 1) {
                this.setState({ rule_body: [], rule_predicate_deleting: "Your last predicate has been deleted", rule_predicate_adding: "" })
            }
            else {
                let n = [...this.state.rule_body.splice(this.state.rule_body.length - 1, 1)]
                console.log("in predicate rule body", n);

                this.setState((prevState) => ({

                    rule_body: [...n], rule_predicate_deleting: "Your last predicate has been deleted", rule_predicate_adding: ""

                }));
                await new Promise(r => setTimeout(r, 3000));
                console.log("last rule body", this.state.rule_body)

            }
        }
        catch (e) {
            this.setState({ rule_predicate_deleting: e.message })
        }
    }

    addPredicate_rule = async (e) => {
        this.setState({ rule_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));
        console.log("in predicate rule body", this.state.rule_body);

        try {
            for (let pas = 1; pas <= this.state.attenuation_ids_parameter.length; pas++) {
                if (this.state.attenuation_ids_name === "" || this.state.attenuation_ids_parameter[this.state.attenuation_ids_parameter.length - pas].param === "" || this.state.attenuation_ids_parameter[this.state.attenuation_ids_parameter.length - pas].type === "") {
                    throw (SyntaxError("all predicate fields must be filled out"))

                }
            }


            if (this.state.rule_body.length === 0) {
                this.setState({
                    rule_body: [{ ids_name: this.state.attenuation_ids_name, rule_ids_parameter: this.state.attenuation_ids_parameter }], attenuation_ids_name: "", attenuation_ids_parameter: [{ param: "", type: "" }], rule_predicate_adding: "your predicate has been added", rule_idx: this.state.rule_idx + 1, hidden_msg_predicate: "Your added predicates :",

                })
                await new Promise(r => setTimeout(r, 1000));

            }
            else {
                this.setState((prevState) => ({

                    rule_body: [...this.state.rule_body, { ids_name: this.state.attenuation_ids_name, rule_ids_parameter: this.state.attenuation_ids_parameter }], attenuation_ids_name: "", attenuation_ids_parameter: [{ param: "", type: "" }], rule_predicate_adding: "your predicate has been added", rule_idx: this.state.rule_idx + 1, hidden_msg_predicate: "Your added predicates :",


                }));
            }
        }
        catch (e) {
            this.setState({ rule_predicate_adding: e.message })
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
    copy() {
        this.setState({copied:true})
        const el = this.textArea
        el.select()
        document.execCommand("copy")
    }
    addPredicate_caveat = async (e) => {
        this.setState({ caveat_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));
        try {
            for (let pas = 0; pas < this.state.attenuation_caveat_ids_parameter.length; pas++) {
                if (this.state.attenuation_caveat_ids_name === "" || this.state.attenuation_caveat_ids_parameter[pas].param === "" || this.state.attenuation_caveat_ids_parameter[pas].type === "") {
                    throw (SyntaxError("all predicate fields must be filled out"))

                }
            }

            if (this.state.caveat_body.length === 0) {
                this.setState({
                    caveat_body: [{ ids_name: this.state.attenuation_caveat_ids_name, caveat_ids_parameter: this.state.attenuation_caveat_ids_parameter }], attenuation_caveat_ids_name: "", attenuation_caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1, caveat_hidden_msg_predicate: "Your added predicates :",

                })
                await new Promise(r => setTimeout(r, 1000));
                console.log("test", this.state.caveat_body);

            }
            else {
                this.setState((prevState) => ({

                    caveat_body: [...prevState.caveat_body, { ids_name: this.state.caveat_ids_name, caveat_ids_parameter: this.state.caveat_ids_parameter }], caveat_ids_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1, caveat_hidden_msg_predicate: "Your added predicates :",
                }));
            }
        }
        catch (e) {
            this.setState({ caveat_predicate_adding: e.message })
        }
    }
    addFactAttenuation = (e) => {
        this.setState((prevState) => ({
            attenuation_fact_head_parameters: [...prevState.attenuation_fact_head_parameters, { param: "", type: "" }]
        }));
    }
    addFactVerification = (e) => {
        this.setState((prevState) => ({
            verification_fact_head_parameters: [...prevState.verification_fact_head_parameters, { param: "", type: "" }], verification_number_of_added_fact: this.state.verification_number_of_added_fact + 1
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
    addRule1_attenuation = (e) => {
        this.setState((prevState) => ({
            attenuation_ids_parameter: [...prevState.attenuation_ids_parameter, { param: "", type: "" }], attenuation_number_of_added_rules_ids: this.state.attenuation_number_of_added_rules_ids + 1
        }));
    }
    addRule_attenuation = (e) => {
        this.setState((prevState) => ({
            attenuation_head_parameter: [...prevState.attenuation_head_parameter, { param: "", type: "" }], attenuation_number_of_added_rules_head: this.state.attenuation_number_of_added_rules_head + 1
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
    addCaveat1Attenuation = (e) => {
        this.setState((prevState) => ({
            attenuation_caveat_ids_parameter: [...prevState.attenuation_caveat_ids_parameter, { param: "", type: "" }], attenuation_number_of_added_caveats_ids: this.state.attenuation_number_of_added_caveats_ids + 1
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
    addCaveatVerification = (e) => {
        this.setState((prevState) => ({
            verification_caveat_head_parameter: [...prevState.verification_caveat_head_parameter, { param: "", type: "" }], verification_number_of_added_caveats_head: this.state.verification_number_of_added_caveats_head + 1
        }));
    }
    render() {
        const { wasm = {} } = this.state;

        const loadKeys_attenuation = () => {
            let decoded = fromHex(this.state.attenuation_privateKey);
            return wasm.KeyPair.fromBytes(decoded);
        }
        const btnText = this.state.copied ? 'Copied' : 'Copy to clipboard'



        let attenuation_head_parameter = [...this.state.attenuation_head_parameter]
        let attenuation_caveat_head_parameter = [...this.state.attenuation_caveat_head_parameter]
        let attenuation_fact_head_parameters = [...this.state.attenuation_fact_head_parameters]
        let attenuation_ids_parameter = [...this.state.attenuation_ids_parameter]
        let attenuation_caveat_ids_parameter = [...this.state.attenuation_caveat_ids_parameter]

        return (
            <div>

                <div className="container-fluid">
                    <div className="warning">
                        <div className="text-center">
                            <strong>Biscuitsec :</strong>

                        Learn how the biscuit token works by interacting with it. For developers, the code of the application is available on our github
                        </div>
                    </div>




                    <h1 className="mr-5 text-center">Token Attenuation </h1>
                    <br />

                    <div className="mr-5 ml-5">The process of attenuation is the generation of a derived token from an already existing biscuit, for the purpose of delegating a reduced set of rights. For instance, the rental agency can restrict the token so that the car must be returned before the end of the week. Note also that the attenuation may be managed from someone that currently holds the biscuit (e.g. the driver can delegate his rights to a secod driver) but is not the initial authority (e.g. the rental agency). Therefore the attenuated token may be using a different keypair than the original token. You may refer to our documentation <a href="https://www.w3schools.com/">here</a> to get more details and examples. </div>
                    <br />
                    <br />
                    <h2 className="mr-5 ml-5">Keys Generation For Your Attenuated Token  </h2>
                    <div className="ml-5 mr-5">In order to attenuate your token and generate a new one you must generate a new keypair</div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Public Key</h5></label> <small> press the button to generate your keys</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" readOnly value={this.state.attenuation_publicKey} rows="2" />
                                </div>



                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label className="exampleFormControlTextarea1"><h5>Private Key</h5></label><small> if you wanna use your private key paste it here</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" type="text" value={this.state.attenuation_privateKey} onChange={this.handleChange_attenuation_privateKey} rows="2" />
                                </div>

                                <button
                                    onClick={async () => {

                                        this.setState({ message_privateKey_attenuation: "" })
                                        let privkey = new Uint8Array(32);
                                        let pubkey = new Uint8Array(32);

                                        let keypair = new wasm.KeyPair();
                                        let publicKey = keypair.publicKey();

                                        keypair.toBytes(privkey);
                                        publicKey.toBytes(pubkey);

                                        this.setState({ attenuation_privateKey: toHex(privkey), attenuation_publicKey: toHex(pubkey) });



                                    }}>
                                    Generate keys
                                </button>
                                <div>{this.state.message_privateKey_attenuation}</div>

                            </div>

                        </div>

                    </div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="textarea-container">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label> <small> paste a token to attenuate here</small>
                                    <textarea className="form-control" ref={(textarea) => this.textArea = textarea} id="exampleFormControlTextarea2" type="text" value={this.state.valueEncodedToAttenuate} onChange={this.handleChange1_attenuation} rows="15" />
                                    <a onClick={() => this.copy()}>{btnText}</a>

                                </div>
                                <div>{this.state.message_encoded_attenuation}</div>
                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>DECODED</h5></label><small> your result</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" readOnly type="text" value={this.state.valueDecodedToAttenuate} onChange={this.handleChangee_attenuation} rows="15" />
                                </div>




                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <h2 className="mr-5 ml-5">Examples of Token Attenuation </h2>
                    <div className="ml-5 mr-5">Here is some examples of a rental car agency delegating some rights to their clients by token attenuation</div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Restrict Operation</h5></label>
                                    <div>This is an exemple of restriction on the operations that the holder of the attenuated token can do.
                                    For example if we fill out the field with open , the only opeartion the token holder can do is opening the car but not driving it.
                                    </div>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" placeholder="open" type="text" value={this.state.restrict} onChange={this.handleChange2} rows="1" />
                                </div>
                                <button
                                    onClick={async () => {
                                        this.setState({ restrict_operation_message: '' })

                                        try {
                                            if (this.state.valueEncodedToAttenuate === '') {
                                                throw (SyntaxError("You must enter the token to revocate !"))
                                            }
                                            if (this.state.restrict === '') {
                                                throw (SyntaxError("You must fill out the field !"))

                                            }
                                            let data = new Uint8Array(atob(this.state.valueEncodedToAttenuate).split("").map(function (c) {
                                                return c.charCodeAt(0);
                                            }));
                                            let token = wasm.Biscuit.from(data);
                                            let block = token.createBlock();
                                            let operation = this.state.restrict;
                                            block.addCaveat(wasm.rule(
                                                "operation_check",
                                                [{ symbol: operation }],
                                                [{ name: "operation", ids: [{ symbol: "ambient" }, { symbol: operation }] }]
                                            ));

                                            let keypair2 = new wasm.KeyPair()
                                            let token2 = token.append(keypair2, block);

                                            let serialized = token2.toVec();
                                            let b64 = btoa(String.fromCharCode(...serialized));
                                            this.setState({ restrict_operation_message: "Your restriction has been set" })

                                            this.setState({ tokenToAttenuate: token2.toVec(), valueEncodedToAttenuate: b64, valueDecodedToAttenuate: token2.print() });
                                        }
                                        catch (e) {
                                            this.setState({ restrict_operation_message: e.message })
                                        }


                                    }}>
                                    Restrict operation
                                </button>
                                <div >{this.state.restrict_operation_message}</div>
                                <br /> <br />
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>Restrict Resource </h5></label>
                                    <div> This is an exemple of a restriction on a resource set by a car rental agency , it provides to every client who rents a car an attenuated token with
                                    a restriction on the resource in order to give him the right to drive only the car which her name verify the restriction.
                                        For example if the rental agency want to rent a car which we suppose its name is "car1" we must fill out the field below by car1  </div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="car1" type="text" value={this.state.resource} onChange={this.handleChange3} rows="1" />

                                </div>
                                <button
                                    onClick={async () => {
                                        try {
                                            this.setState({ resource_prefix_message: '' })

                                            if (this.state.valueEncodedToAttenuate === '') {
                                                throw (SyntaxError("You must enter the token to revocate !"))
                                            }
                                            if (this.state.resource === '') {
                                                throw (SyntaxError("You must fill out the field !"))

                                            }
                                            let data = new Uint8Array(atob(this.state.valueEncodedToAttenuate).split("").map(function (c) {
                                                return c.charCodeAt(0);
                                            }));
                                            let token = wasm.Biscuit.from(data);

                                            let resourcePrefix = this.state.resource;

                                            let block = token.createBlock();
                                            block.addCaveat(wasm.constrained_rule(
                                                "resource_check",
                                                [{ variable: 0 }],
                                                [
                                                    {
                                                        name: "resource",
                                                        ids: [{ symbol: "ambient" }, { variable: 0 }]
                                                    },
                                                ],
                                                [{ id: 0, kind: "string", operation: "prefix", data: resourcePrefix }]
                                            ));

                                            let keypair2 = new wasm.KeyPair()
                                            let token2 = token.append(keypair2, block);

                                            let serialized = token2.toVec();
                                            let b64 = btoa(String.fromCharCode(...serialized));
                                            this.setState({ resource_prefix_message: "Your restriction has been set" })

                                            this.setState({ tokenToAttenuate: token2.toVec(), valueEncodedToAttenuate: b64, valueDecodedToAttenuate: token2.print() });
                                        }
                                        catch (e) {
                                            this.setState({ resource_prefix_message: e.message })
                                        }

                                    }}>
                                    Restrict resource
                                </button>
                                <div >{this.state.resource_prefix_message}</div>



                            </div>
                            <br />
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>Token Expiration</h5></label>
                                    <div>We can also attenuate a token for a defined moment by specifying how much time the token will be valid.
                                    If we fill out the field with 3600 (second) the token we be usable for only one hour so for the example of a rental car agency the car will be rented only one hour
                                    </div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="30 (seconds)" type="text" value={this.state.seconds} onChange={this.handleChange6} rows="1" />

                                </div>
                                <button
                                    onClick={async () => {
                                        this.setState({ token_revocation_message: '' })

                                        try {
                                            if (this.state.valueEncodedToAttenuate === '') {
                                                throw (SyntaxError("You must enter the token to revocate !"))
                                            }
                                            if (this.state.seconds === '') {
                                                throw (SyntaxError("You must fill out the field !"))

                                            }
                                            if (isNaN(this.state.seconds)===true)
                                            {
                                                throw(SyntaxError("You must enter an integer "))
                                            }
                                            let data = new Uint8Array(atob(this.state.valueEncodedToAttenuate).split("").map(function (c) {
                                                return c.charCodeAt(0);
                                            }));
                                            let token = wasm.Biscuit.from(data);

                                            let seconds = parseInt(this.state.seconds);
                                            let expirationDate = parseInt(((new Date((new Date()).getTime() + seconds * 1000)) / 1000).toFixed(0));
                                            console.log("expires at " + expirationDate);

                                            let block = token.createBlock();
                                            block.addCaveat(wasm.constrained_rule(
                                                "expiration_check",
                                                [{ variable: 0 }],
                                                [
                                                    {
                                                        name: "time",
                                                        ids: [{ symbol: "ambient" }, { variable: 0 }]
                                                    },
                                                ],
                                                [{ id: 0, kind: "date", operation: "<=", data: expirationDate }]
                                            ));

                                            let keypair2 = new wasm.KeyPair()
                                            let token2 = token.append(keypair2, block);
                                            let serialized = token2.toVec();
                                            let b64 = btoa(String.fromCharCode(...serialized));
                                            
                                            this.setState({ tokenToAttenuate: token2.toVec(), valueEncodedToAttenuate: b64, valueDecodedToAttenuate: token2.print() })
                                            this.setState({ token_revocation_message: "Your expiration time has been set" })

                                        }
                                        catch (e) {
                                            this.setState({ token_revocation_message: e.message })
                                        }

                                    }}>
                                    Time before expiration
                                </button>
                                <div >{this.state.token_revocation_message}</div>


                            </div>

                        </div>

                    </div>
                    <br />
                    <h2 className="mr-5 ml-5">Set your own attenuation  </h2>

                    <br />
                    <div className="container-fluid mt-10" onChange={this.handleChange}>
                        <div className="row">

                            <div className="col-3 ml-5 mr-5">
                                <h2>Add a new rule</h2>

                            </div>
                        </div>
                        <div className="ml-5 mr-5">The rule has the same structure as the authority rule and it will be applied on the facts of the attenuated token.
                        <br /><strong>Note : if the rule generates an ambient or an authority fact it will automatically fail in the verification process. </strong></div>
                        <br />
                        <div className="ml-5"><h3>Header</h3></div>

                        <div className="row">

                            <div className="col-1 mr-2 ml-5 ">
                                <div className="row">
                                    <label >{`head name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.attenuation_head_name}
                                        className="attenuation_head_name form-control"
                                        id="head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <HeadInputAttenuation rules={attenuation_head_parameter}



                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addRule_attenuation} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>

                        </div>
                        <div className="ml-5"><h3>Body</h3></div>
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
                                        value={this.state.attenuation_ids_name}
                                        className="attenuation_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <HeadInput1Attenuation rules={attenuation_ids_parameter} rule_idx={this.state.rule_idx}



                            />
                            <div className="col-0 mr-2">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >
                                    <h3>
                                        <IconButton onClick={this.addRule1_attenuation} >
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
                                        add predicate
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
                        <br />
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-0 ">
                                <button onClick={async () => {
                                    try {

                                        this.setState({ attenuation_rule_adding_message: '' })
                                        for (let pas = 0; pas < this.state.attenuation_head_parameter.length; pas++) {
                                            if (this.state.attenuation_head_name === "" || this.state.attenuation_head_parameter[pas].param === "" || this.state.attenuation_head_parameter[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }

                                        if (this.state.attenuation_rule_counter === 0) {


                                            if (this.state.rule_body.length === 0) {
                                                throw (SyntaxError("You must add at least one predicate !"))
                                            }
                                            this.setState({
                                                attenuation_rules: [{ head_parameter: this.state.attenuation_head_parameter, head_name: this.state.attenuation_head_name, body: this.state.rule_body }]
                                            });


                                        }
                                        else {

                                            if (this.state.rule_body.length === 0) {
                                                throw (SyntaxError("You must add at least one predicate !"))
                                            }

                                            this.setState((prevState) => ({
                                                attenuation_rules: [...prevState.attenuation_rules, { head_parameter: this.state.attenuation_head_parameter, head_name: this.state.attenuation_head_name, body: this.state.rule_body }]
                                            }));
                                        }
                                        this.setState({ attenuation_rule_adding_message: "Your new rule has been added" });

                                        this.setState({ attenuation_rule_counter: this.state.attenuation_rule_counter + 1 })
                                        this.setState({ attenuation_head_parameter: [{ param: "", type: "" }], attenuation_head_name: '', rule_idx: 1, caveat_predicate_adding: "", body: [], rule_body: [] })
                                        await new Promise(r => setTimeout(r, 1000));

                                    }

                                    catch (e) {
                                        this.setState({ attenuation_rule_adding_message: e.message })
                                    }

                                }}>Add rule</button>
                            </div>
                            <div className="col-2 ml-2">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({


                                            attenuation_head_parameter: [{ param: "", type: "" }], attenuation_ids_parameter: [{ param: "", type: "" }], attenuation_head_name: "", attenuation_ids_name: "",

                                            attenuation_rule_adding_message: "", attenuation_rule_counter: 0,
                                            attenuation_number_of_added_rules_head: 0, attenuation_number_of_added_rules_ids: 0, rule_body: [],
                                            rule_predicate_adding: "", rule_idx: 1, rule_predicate_deleting: "",

                                        })





                                    }}>Reset rule</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">

                            <div className="col-2 mr-2 ml-5 ">
                                <div id="attenuation_rule_adding_result">{this.state.attenuation_rule_adding_message}</div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 ml-5">
                                <h2>Add a new fact</h2>

                            </div>
                        </div>
                        <div className="ml-5 mr-5">The fact in the attenuated token has the same structure as the one explained in the genration page but the only difference is the fact here hold the rights of the attenuated token.
                            <br /><strong>Note : the fact cannot contain the authority or ambient symbols otherwise the verification will fail</strong></div>
                        <br />
                        <div className="row">

                            <div className="col-1 mr-2 ml-5">
                                <div className="row">
                                    <label >{`fact name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.attenuation_fact_head_name}
                                        className="attenuation_fact_head_name form-control"
                                        id="fact-head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <FactParamInputAttenuation rules={attenuation_fact_head_parameters}

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addFactAttenuation} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>

                        </div>

                        <br />
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-0 ">
                                <button className="col-12" onClick={async () => {
                                    try {
                                        this.setState({ attenuation_fact_adding_message: '' })
                                        for (let pas = 0; pas < this.state.attenuation_fact_head_parameters.length; pas++) {
                                            if (this.state.attenuation_fact_head_name === "" || this.state.attenuation_fact_head_parameters[pas].param === "" || this.state.attenuation_fact_head_parameters[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        if (this.state.attenuation_fact_counter === 0) {
                                            
                                            this.setState({
                                                attenuation_facts: [{ fact_head_parameters: this.state.attenuation_fact_head_parameters, fact_head_name: this.state.attenuation_fact_head_name, }]
                                            });
                                        }
                                        else {
                                            
                                            this.setState((prevState) => ({
                                                attenuation_facts: [...prevState.attenuation_facts, { fact_head_parameters: this.state.attenuation_fact_head_parameters, fact_head_name: this.state.attenuation_fact_head_name, }]
                                            }));
                                        }
                                        this.setState({ attenuation_fact_head_name: "", attenuation_fact_head_parameters: [{ param: "", type: "" }] })

                                        this.setState({ attenuation_fact_adding_message: "Your new fact has been added" });

                                        this.setState({ attenuation_fact_counter: this.state.attenuation_fact_counter + 1 })


                                    }
                                    catch (e) {

                                        this.setState({ attenuation_fact_adding_message: e.message })

                                    }

                                }}>Add fact</button>
                            </div>
                            <div className="col-2 ml-3">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({



                                            attenuation_fact_head_name: "", attenuation_fact_head_parameters: [{ param: "", type: "" }],
                                            
                                            attenuation_fact_adding_message: "", 
                                        })





                                    }}>Reset fact</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">

                            <div className="col-2 mr-2 ml-5">
                                <div id="fact_adding_result">{this.state.attenuation_fact_adding_message}</div>

                            </div>
                        </div>
                        <br />
                        <div className="row">

                            <div className="col-3 ml-5 mr-5">
                                <h2>Add a new caveat</h2>

                            </div>
                        </div>
                        <div className="ml-5 mr-5">Caveats are logic queries evaluating conditions on authority and ambient facts. To validate an operation, all of a token's caveats must succeed.In the attenuated token the caveat are used to set conditions on the rights that the holder of the attenuated token can have. </div>
                        <div className="ml-5"><h3>Header</h3></div>

                        <div className="row">

                            <div className="col-1 mr-2 ml-5">
                                <div className="row">
                                    <label >{`head name `}</label>
                                </div>
                                <div className="row">

                                    <textarea variant="outlined"
                                        type="text"
                                        value={this.state.attenuation_caveat_head_name}
                                        className="attenuation_caveat_head_name form-control"
                                        id="head-name"
                                        row="1"

                                    />

                                </div>
                            </div>

                            <CaveatInputAttenuation rules={attenuation_caveat_head_parameter}
                                type="text"

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addCaveatAttenuation} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>
                        </div>
                        <div className="ml-5"><h3>Body</h3></div>
                        <h5 className="ml-5">{this.state.caveat_hidden_msg_predicate}</h5>

                        <ShowPredicateCaveat predicates={this.state.caveat_body} />
                        <div className="row">
                            <div className="col-1 ml-5">
                                <div className="row">
                                    <label >{`pid${this.state.caveat_idx}`}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.attenuation_caveat_ids_name}
                                        className="attenuation_caveat_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <CaveatInput1Attenuation rules={attenuation_caveat_ids_parameter} caveat_idx={this.state.caveat_idx}



                            />
                            <div className="col-0 mr-2">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >
                                    <h3>
                                        <IconButton onClick={this.addCaveat1Attenuation} >
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
                            <br />
                            <div className="col-1"></div>

                            <div className="col-0 ml-1 ">
                                <button onClick={async () => {
                                    try {

                                        this.setState({ attenuation_caveat_adding_message: '' })
                                        for (let pas = 0; pas < this.state.attenuation_caveat_head_parameter.length; pas++) {
                                            if (this.state.attenuation_caveat_head_name === "" || this.state.attenuation_caveat_head_parameter[pas].param === "" || this.state.attenuation_caveat_head_parameter[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        if (this.state.attenuation_caveat_counter === 0) {

                                            if (this.state.caveat_body.length === 0) {
                                                throw (SyntaxError("You must add at least one predicate !"))
                                            }

                                            this.setState({
                                                attenuation_caveats: [{ head_parameter: this.state.attenuation_caveat_head_parameter, head_name: this.state.attenuation_caveat_head_name, body: this.state.caveat_body }]
                                            });
                                        }
                                        else {


                                            if (this.state.caveat_body.length === 0) {
                                                throw (SyntaxError("You must add at least one predicate !"))
                                            }
                                            this.setState((prevState) => ({
                                                attenuation_caveats: [...prevState.attenuation_caveats, { head_parameter: this.state.attenuation_caveat_head_parameter, head_name: this.state.attenuation_caveat_head_name, body: this.state.caveat_body }]
                                            }));
                                        }
                                        this.setState({ attenuation_caveat_adding_message: "Your new caveat has been added" });

                                        this.setState({ attenuation_caveat_counter: this.state.attenuation_caveat_counter + 1 })
                                        this.setState({ attenuation_caveat_head_name: "", attenuation_caveat_head_parameter: [{ param: "", type: "" }], caveat_idx: 1, rule_predicate_adding: "", body: [], caveat_body: [] })

                                    }
                                    catch (e) {
                                        this.setState({ attenuation_caveat_adding_message: e.message })
                                    }


                                }}>Add caveat</button>
                            </div>

                            <div className="col-1 ml-1">
                                <div className="row">
                                    <button onClick={async () => {
                                        this.setState({

                                            attenuation_caveat_head_parameter: [{ param: "", type: "" }], attenuation_caveat_ids_parameter: [{ param: "", type: "" }], attenuation_caveat_head_name: "", attenuation_caveat_ids_name: "",
                                            attenuation_caveat_adding_message: "", attenuation_number_of_added_caveats_head: 0, attenuation_number_of_added_caveats_ids: 0, caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1,caveat_predicate_deleting: ""
                                            



                                        })





                                    }}>Reset caveat</button>
                                </div>
                            </div>


                        </div>
                        <br />
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="attenuation_caveat_adding_result">{this.state.attenuation_caveat_adding_message}</div>

                            </div>
                        </div>

                        <br /> <br />

                        <div className="row">
                            <div className="col-4">

                            </div>
                            <div className="col-2 ml-5">
                                <button onClick={async () => {
                                    this.setState({ gen_err_attenuation: '' })

                                    try {
                                        if (this.state.valueEncodedToAttenuate === '') {
                                            throw (SyntaxError("You must enter the token to attenuate !"))
                                        }
                                        let data = new Uint8Array(atob(this.state.valueEncodedToAttenuate).split("").map(function (c) {
                                            return c.charCodeAt(0);
                                        }));
                                        let token = wasm.Biscuit.from(data);
                                        let block = token.createBlock();

                                        if (this.state.attenuation_rule_counter > 0) {
                                            for (let pas = 0; pas < this.state.attenuation_rules.length; pas++) {
                                                console.log("step {}", pas);
                                                let head_parameter1 = [...this.state.attenuation_rules[pas].head_parameter];
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
                                                let body = [...this.state.attenuation_rules[pas].body];
                                                console.log("last test body rule", this.state.attenuation_rules[pas].body)
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
                                                    this.state.attenuation_rules[pas].head_name,
                                                    head_parameter,
                                                    body_for_rule
                                                )
                                                block.addRule(rule);
                                            }
                                        }

                                        console.log("fact counter :", this.state.attenuation_fact_counter);
                                        if (this.state.attenuation_fact_counter > 0) {
                                            for (let pas = 0; pas < this.state.attenuation_facts.length; pas++) {

                                                let fact_parameter1 = [...this.state.attenuation_facts[pas].fact_head_parameters];
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
                                                    else if (fact_parameter1[pas1].type === "date ") {
                                                        fact_parameter = [...fact_parameter, { date : Date.parse(fact_parameter1[pas1].param) }]
                                                    }
                                                }
                                                let fact = wasm.fact(
                                                    this.state.attenuation_facts[pas].fact_head_name,
                                                    fact_parameter,

                                                )
                                                block.addFact(fact);


                                            }

                                        }
                                        console.log("caveat counter :", this.state.attenuation_caveat_counter);
                                        if (this.state.attenuation_caveat_counter > 0) {
                                            for (let pas = 0; pas < this.state.attenuation_caveats.length; pas++) {
                                                console.log("step {}", pas);
                                                let head_parameter1 = [...this.state.attenuation_caveats[pas].head_parameter];
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
                                                let body = [...this.state.attenuation_caveats[pas].body];
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
                                                        else if (ids_parameters[pas2].type === "date") {
                                                            ids_parameter_for_rule = [...ids_parameter_for_rule, { date: Date.parse(ids_parameters[pas2].param) }]
                                                        }
                                                        else if (ids_parameters[pas2].type === "integer") {
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
                                                    this.state.attenuation_caveats[pas].head_name,
                                                    head_parameter,
                                                    body_for_rule
                                                )
                                                block.addCaveat(rule);
                                            }
                                        }

                                        if (this.state.attenuation_privateKey === '') {
                                            throw SyntaxError("Your must enter or generate your private key before generating the token")
                                        }
                                        let token2 = token.append(loadKeys_attenuation(), block);

                                        let serialized = token2.toVec();
                                        let b64 = btoa(String.fromCharCode(...serialized));

                                        this.setState({ tokenToAttenuate: token2.toVec(), valueEncodedToAttenuate: b64, valueDecodedToAttenuate: token2.print() });
                                        this.setState({
                                            //rule attenuation states
                                            attenuation_head_parameter: [{ param: "", type: "" }], attenuation_ids_parameter: [{ param: "", type: "" }], attenuation_head_name: "", attenuation_ids_name: "",
                                            attenuation_rules: [{ head_parameter: [{ param: "", type: "" }], head_name: "", body: [] }],
                                            attenuation_rule_adding_message: "", attenuation_rule_counter: 0, attenuation_number_of_added_rules_head: 0, attenuation_number_of_added_rules_ids: 0, rule_body: [], rule_predicate_adding: "", rule_idx: 1, hidden_msg_predicate: "",
                                            //fact attenuation states
                                            attenuation_fact_head_name: "", attenuation_fact_head_parameters: [{ param: "", type: "" }],
                                            attenuation_facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
                                            attenuation_fact_adding_message: "", attenuation_fact_counter: 0, attenuation_number_of_added_fact: 0,
                                            //caveat attenuation states
                                            attenuation_caveat_head_parameter: [{ param: "", type: "" }], attenuation_caveat_ids_parameter: [{ param: "", type: "" }], attenuation_caveat_head_name: "", attenuation_caveat_ids_name: "",
                                            attenuation_caveats: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
                                            attenuation_caveat_adding_message: "", attenuation_caveat_counter: 0, attenuation_number_of_added_caveats_head: 0, attenuation_number_of_added_caveats_ids: 0, caveat_body: [], caveat_predicate_adding: "", caveat_idx: 1, caveat_hidden_msg_predicate: "",

                                        })
                                    } catch (e) {
                                        this.setState({ gen_err_attenuation: e.message });
                                    }






                                }}

                                > Generate your new token </button>
                                <div>{this.state.gen_err_attenuation}</div>

                            </div>
                        </div>

                    </div>




                </div>

            </div >

        )
    }
}
export default Debugger;


