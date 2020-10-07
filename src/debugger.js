import React from 'react'
import HeadInput from "./headinput"
import HeadInput1 from "./headinput1"
import HeadInputAttenuation from "./HeadInputAttenuation"
import HeadInput1Attenuation from "./HeadInput1Attenuation"
import HeadInput1Caveat from "./HeadInput1_caveat"
import HeadInputCaveat from "./HeadInput_caveat"
import FactParamInputAttenuation from "./FactParamInputAttenuation"
import FactParamInput from "./FactParamInput";
import CaveatInputAttenuation from "./CaveatInputAttenuation";
import CaveatInput1Attenuation from "./CaveatInput1Attenuation";
import 'bootstrap/dist/css/bootstrap.min.css';
import CaveatInput1Verification from "./CaveatInput1Verification"
import CaveatInputVerification from "./CaveatInputVerification"
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FactParamInputVerification from './FactInputVerification'
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
            message_encoded_attenuation: '', message_encoded: '', message_privateKey: '', message_privateKey_own_verification: '', message_privateKey_attenuation: '',
            //rule states
            head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "",
            rules: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
            rule_adding_message: "", rule_counter: 0, number_of_added_rules_head: 0, number_of_added_rules_ids: 0,
            //fact states
            fact_head_name: "", fact_head_parameters: [{ param: "", type: "" }],
            facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
            fact_adding_message: "", fact_counter: 0, number_of_added_fact: 0,
            //caveat states
            caveat_head_parameter: [{ param: "", type: "" }], caveat_ids_parameter: [{ param: "", type: "" }], caveat_head_name: "", caveat_ids_name: "",
            caveats: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
            caveat_adding_message: "", caveat_counter: 0, number_of_added_caveats_head: 0, number_of_added_caveats_ids: 0,
            //rule attenuation states
            attenuation_head_parameter: [{ param: "", type: "" }], attenuation_ids_parameter: [{ param: "", type: "" }], attenuation_head_name: "", attenuation_ids_name: "",
            attenuation_rules: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
            attenuation_rule_adding_message: "", attenuation_rule_counter: 0, attenuation_number_of_added_rules_head: 0, attenuation_number_of_added_rules_ids: 0,
            //fact attenuation states
            attenuation_fact_head_name: "", attenuation_fact_head_parameters: [{ param: "", type: "" }],
            attenuation_facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
            attenuation_fact_adding_message: "", attenuation_fact_counter: 0, attenuation_number_of_added_fact: 0,
            //caveat attenuation states
            attenuation_caveat_head_parameter: [{ param: "", type: "" }], attenuation_caveat_ids_parameter: [{ param: "", type: "" }], attenuation_caveat_head_name: "", attenuation_caveat_ids_name: "",
            attenuation_caveats: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
            attenuation_caveat_adding_message: "", attenuation_caveat_counter: 0, attenuation_number_of_added_caveats_head: 0, attenuation_number_of_added_caveats_ids: 0,
            //fact verification states
            verification_fact_head_name: "", verification_fact_head_parameters: [{ param: "", type: "" }],
            verification_facts: [{ fact_head_parameters: [{ param: "", type: "" }], fact_head_name: "" }],
            verification_fact_adding_message: "", verification_fact_counter: 0, verification_number_of_added_fact: 0,
            //caveat verification states
            verification_caveat_head_parameter: [{ param: "", type: "" }], verification_caveat_ids_parameter: [{ param: "", type: "" }], verification_caveat_head_name: "", verification_caveat_ids_name: "",
            verification_caveats: [{ head_parameter: [{ param: "", type: "" }], ids_parameter: [{ param: "", type: "" }], head_name: "", ids_name: "" }],
            verification_caveat_adding_message: "", verification_caveat_counter: 0, verification_number_of_added_caveats_head: 0, verification_number_of_added_caveats_ids: 0,

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
        else if (["attenuation_head_parameter form-control"].includes(e.target.className)) {
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
        else if (["verification_caveat_head_parameter form-control"].includes(e.target.className)) {
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
        const loadKeys = () => {
            let decoded = fromHex(this.state.privateKey);
            return wasm.KeyPair.fromBytes(decoded);
        }
        const loadKeys_attenuation = () => {
            let decoded = fromHex(this.state.attenuation_privateKey);
            return wasm.KeyPair.fromBytes(decoded);
        }

        let head_parameter = [...this.state.head_parameter]
        let caveat_head_parameter = [...this.state.caveat_head_parameter]
        let attenuation_head_parameter = [...this.state.attenuation_head_parameter]
        let attenuation_caveat_head_parameter = [...this.state.attenuation_caveat_head_parameter]
        let verification_caveat_head_parameter = [...this.state.verification_caveat_head_parameter]

        let fact_head_parameters = [...this.state.fact_head_parameters]
        let attenuation_fact_head_parameters = [...this.state.attenuation_fact_head_parameters]
        let verification_fact_head_parameters = [...this.state.verification_fact_head_parameters]
        let ids_parameter = [...this.state.ids_parameter]
        let caveat_ids_parameter = [...this.state.caveat_ids_parameter]
        let attenuation_ids_parameter = [...this.state.attenuation_ids_parameter]
        let attenuation_caveat_ids_parameter = [...this.state.attenuation_caveat_ids_parameter]
        let verification_caveat_ids_parameter = [...this.state.verification_caveat_ids_parameter]

        return (
            <div>
                {/* <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="text" value={this.state.value} onChange={this.handleChange}/> */}
                <div className="container-fluid">
                    <br /> <br /> <br />
                    <h1 className="mr-5">Biscuit Playground </h1>
                    <br />
                    <div className="warning"><strong>Warning:</strong> Biscuit Web Tokens are credentials, which can grant access to resources. Be careful where you paste them! We do not record tokens, all validation and debugging is done on the client side.(à changer)</div>

                    <br />
                    <h2 className="mr-5">Root Keys Generation </h2>
                    <br />
                    <div className="container-fluid mt-10">
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
                    <h2 className="mr-5">Example of Token Generation </h2>

                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" readOnly type="text" value={this.state.valueEncoded_example} onChange={this.handleChange1_example} rows="15" />
                                </div>
                                <div>{this.state.message_encoded_example}</div>
                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>DECODED</h5></label><small> your result</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" readOnly type="text" value={this.state.valueDecoded_example} onChange={this.handleChangee_example} rows="15" />
                                </div>

                                <button
                                    onClick={async () => {
                                        this.setState({ gen_err_example: '' })
                                        let builder = new wasm.Biscuit()

                                        let fact = wasm.fact("right", [
                                            wasm.symbol("authority"),
                                            wasm.string("/apps/123"),
                                            wasm.symbol("read")
                                        ])
                                        builder.addAuthorityFact(fact)

                                        fact = wasm.fact("right", [
                                            { symbol: "authority" },
                                            { string: "/apps/456" },
                                            { symbol: "read" }
                                        ])
                                        builder.addAuthorityFact(fact)
                                        let param = { symbol: "authority" }
                                        fact = wasm.fact("right", [
                                            param,
                                            { string: "/apps/123" },
                                            { symbol: "write" }
                                        ])
                                        builder.addAuthorityFact(fact)
                                        try {
                                            let token = builder.build(loadKeys())
                                            let serialized = token.toVec();
                                            let b64 = btoa(String.fromCharCode(...serialized));

                                            this.setState({ token_example: token.toVec(), valueEncoded_example: b64, valueDecoded_example: token.print() });
                                        } catch (error) {
                                            this.setState({ gen_err_example: "You must generate your keypair before generating your token !" });
                                        }


                                    }}>
                                    Basic rights token
                                </button>

                                <button
                                    onClick={async () => {
                                        this.setState({ gen_err_example: '' })
                                        let builder = new wasm.Biscuit()

                                        builder.addAuthorityRule(wasm.constrained_rule(
                                            "right",
                                            [{ symbol: "authority" }, { variable: 0 }, { variable: 1 }],
                                            [
                                                {
                                                    name: "resource",
                                                    ids: [{ symbol: "ambient" }, { variable: 0 }]
                                                },
                                                {
                                                    name: "operation",
                                                    ids: [{ symbol: "ambient" }, { variable: 1 }]
                                                }
                                            ],
                                            [{ id: 0, kind: "string", operation: "prefix", data: "/" }]
                                        ));
                                        try {
                                            let token = builder.build(loadKeys())
                                            let serialized = token.toVec();
                                            let b64 = btoa(String.fromCharCode(...serialized));

                                            this.setState({ token_example: token.toVec(), valueEncoded_example: b64, valueDecoded_example: token.print() });
                                        } catch (error) {
                                            this.setState({ gen_err_example: "You must generate your keypair before generating your token !" });
                                        }



                                        //alert(wasm.print());



                                    }}>
                                    Generate all rights token
                                </button>
                                <div id="verification_result">{this.state.gen_err_example}</div>

                            </div>
                        </div>
                    </div>

                    <br />
                    <h1 className="mr-5">Generate Your Own Token </h1>

                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label> <small> paste a token here</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.valueEncoded} onChange={this.handleChange1} rows="15" />
                                </div>
                                <div>{this.state.message_encoded}</div>
                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>DECODED</h5></label><small> your result</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" readOnly type="text" value={this.state.valueDecoded} onChange={this.handleChangee} rows="15" />
                                </div>

                                <button onClick={async () => {

                                    this.setState({ gen_err_empty: '' })
                                    let builder = new wasm.Biscuit()


                                    try {
                                        let token = builder.build(loadKeys())
                                        let serialized = token.toVec();
                                        let b64 = btoa(String.fromCharCode(...serialized));
                                        this.setState({ token: token.toVec(), valueEncoded: b64, valueDecoded: token.print() });

                                    } catch (error) {
                                        this.setState({ gen_err_empty: "You must generate your keypair before generating your token !" });
                                    }

                                }}>generate empty token</button>
                                <div id="generation_result">{this.state.gen_err_empty}</div>


                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="container-fluid mt-10" onChange={this.handleChange}>
                        <div className="row">
                            <div className="col-4"></div>

                            <div className="col-3">
                                <h2>add a new rule</h2>

                            </div>
                        </div>
                        <div className="row">

                            <div className="col-2 ml-5 mr-2 ">
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
                            <div className="col-1">
                                <div className="row">
                                    <label >{`ids name `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.ids_name}
                                        className="ids_name form-control"
                                    />

                                </div>
                            </div>

                            <HeadInput1 rules={ids_parameter}
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
                        </div>

                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <button className="col-10" onClick={async () => {
                                    try {
                                        this.setState({ rule_adding_message: '' })


                                        if (this.state.rule_counter === 0) {
                                            for (let pas = 0; pas < this.state.number_of_added_rules_head + 1; pas++) {
                                                if (this.state.head_name === "" || this.state.head_parameter[pas].param === "" || this.state.head_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 0; pas < this.state.number_of_added_rules_ids + 1; pas++) {
                                                if (this.state.ids_name === "" || this.state.ids_parameter[pas].param === "" || this.state.ids_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            this.setState({
                                                rules: [{ head_parameter: this.state.head_parameter, ids_parameter: this.state.ids_parameter, head_name: this.state.head_name, ids_name: this.state.ids_name }]
                                            });
                                        }
                                        else {
                                            for (let pas = 1; pas <= this.state.number_of_added_rules_head; pas++) {
                                                if (this.state.head_name === "" || this.state.head_parameter[this.state.head_parameter.length - pas].param === "" || this.state.head_parameter[this.state.head_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 1; pas <= this.state.number_of_added_rules_ids; pas++) {
                                                if (this.state.ids_name === "" || this.state.ids_parameter[this.state.ids_parameter.length - pas].param === "" || this.state.ids_parameter[this.state.ids_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }


                                            this.setState((prevState) => ({
                                                rules: [...prevState.rules, { head_parameter: this.state.head_parameter, ids_parameter: this.state.ids_parameter, head_name: this.state.head_name, ids_name: this.state.ids_name }]
                                            }));
                                        }
                                        this.setState({ rule_adding_message: "Your new rule has been added" });

                                        this.setState({ rule_counter: this.state.rule_counter + 1 })

                                    }
                                    catch (e) {
                                        this.setState({ rule_adding_message: e.message })
                                    }





                                }}>add rule</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="rule_adding_result">{this.state.rule_adding_message}</div>

                            </div>
                        </div>

                    </div>
                    <div className="container-fluid mt-10" onChange={this.handleChange}>
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-3">
                                <h2>add a new fact</h2>

                            </div>
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

                            <div className="col-2 mr-1 ">
                                <button className="col-10" onClick={async () => {
                                    try {

                                        this.setState({ fact_adding_message: '' });
                                        if (this.state.fact_counter === 0) {
                                            console.log("number of facts", this.state.number_of_added_fact);
                                            for (let pas = 0; pas < this.state.number_of_added_fact + 1; pas++) {
                                                if (this.state.fact_head_name === "" || this.state.fact_head_parameters[pas].param === "" || this.state.fact_head_parameters[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }

                                            this.setState({
                                                facts: [{ fact_head_parameters: this.state.fact_head_parameters, fact_head_name: this.state.fact_head_name, }]
                                            });
                                        }
                                        else {
                                            for (let pas = 1; pas <= this.state.number_of_added_fact + 1; pas++) {
                                                if (this.state.fact_head_name === "" || this.state.fact_head_parameters[this.state.fact_head_parameters.length - pas].param === "" || this.state.fact_head_parameters[this.state.fact_head_parameters.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))
                                                }
                                            }
                                            this.setState((prevState) => ({
                                                facts: [...prevState.facts, { fact_head_parameters: this.state.fact_head_parameters, fact_head_name: this.state.fact_head_name, }]
                                            }));

                                        }

                                        this.setState({ fact_adding_message: "Your new fact has been added" });

                                        this.setState({ fact_counter: this.state.fact_counter + 1 })

                                    }
                                    catch (e) {

                                        this.setState({ fact_adding_message: e.message })

                                    }

                                }}>add fact</button>
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
                            <div className="col-4"></div>

                            <div className="col-3">
                                <h2>add a new caveat</h2>

                            </div>
                        </div>
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

                            <HeadInputCaveat rules={caveat_head_parameter}
                                type="text"

                            />
                            <div className="col-0 mr-3 ">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row">

                                    <IconButton onClick={this.addRule_caveat} >
                                        < AddCircleIcon />
                                    </IconButton>

                                </div>
                            </div>

                            <div className="col-1">
                                <div className="row">
                                    <label >{`ids_name `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.caveat_ids_name}
                                        className="caveat_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <HeadInput1Caveat rules={caveat_ids_parameter}
                                type="text"
                                value={this.state.ids_parameter}
                                className="caveat_ids_parameter"


                            />
                            <div className="col-0 mr-2">
                                <div className="row">
                                    <br /> <br />
                                </div>
                                <div className="row" >
                                    <h3>
                                        <IconButton onClick={this.addRule1_caveat} >
                                            < AddCircleIcon />
                                        </IconButton>
                                    </h3>


                                </div>
                            </div>















                        </div>
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <button className="col-10" onClick={async () => {
                                    try {
                                        this.setState({ caveat_adding_message: '' })

                                        if (this.state.caveat_counter === 0) {

                                            for (let pas = 0; pas < this.state.number_of_added_caveats_head + 1; pas++) {
                                                if (this.state.caveat_head_name === "" || this.state.caveat_head_parameter[pas].param === "" || this.state.caveat_head_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 0; pas < this.state.number_of_added_caveats_ids + 1; pas++) {
                                                if (this.state.caveat_ids_name === "" || this.state.caveat_ids_parameter[pas].param === "" || this.state.caveat_ids_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            console.log(this.state.head_name);
                                            this.setState({
                                                caveats: [{ head_parameter: this.state.caveat_head_parameter, ids_parameter: this.state.caveat_ids_parameter, head_name: this.state.caveat_head_name, ids_name: this.state.caveat_ids_name }]
                                            });
                                        }
                                        else {
                                            console.log("here", this.state.number_of_added_caveats_head)
                                            for (let pas = 1; pas <= this.state.number_of_added_caveats_head; pas++) {
                                                if (this.state.caveat_head_name === "" || this.state.caveat_head_parameter[this.state.caveat_head_parameter.length - pas].param === "" || this.state.caveat_head_parameter[this.state.caveat_head_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 1; pas <= this.state.number_of_added_caveats_ids; pas++) {
                                                if (this.state.caveat_ids_name === "" || this.state.caveat_ids_parameter[this.state.caveat_ids_parameter.length - pas].param === "" || this.state.caveat_ids_parameter[this.state.caveat_ids_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }



                                            this.setState((prevState) => ({
                                                caveats: [...prevState.caveats, { head_parameter: this.state.caveat_head_parameter, ids_parameter: this.state.caveat_ids_parameter, head_name: this.state.caveat_head_name, ids_name: this.state.caveat_ids_name }]
                                            }));
                                        }
                                        this.setState({ caveat_adding_message: "Your new ceveat has been added" });

                                        this.setState({ caveat_counter: this.state.rule_counter + 1 })

                                    }
                                    catch (e) {
                                        this.setState({ caveat_adding_message: e.message })
                                    }


                                }}>add caveat</button>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <div id="caveat_adding_result">{this.state.caveat_adding_message}</div>

                            </div>
                        </div>

                        <br /> <br />
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
                                            }
                                            // console.log(head_parameter)
                                            let ids_parameter1 = [...this.state.rules[pas].ids_parameter];

                                            let ids_parameter = [];

                                            for (let pas1 = 0; pas1 < ids_parameter1.length; pas1++) {
                                                if (ids_parameter1[pas1].type === "variable") {
                                                    ids_parameter = [...ids_parameter, { variable: parseInt(ids_parameter1[pas1].param) }]
                                                }
                                                else if (ids_parameter1[pas1].type === "string") {
                                                    ids_parameter = [...ids_parameter, { string: ids_parameter1[pas1].param }]
                                                }
                                                else if (ids_parameter1[pas1].type === "symbol") {
                                                    ids_parameter = [...ids_parameter, { symbol: ids_parameter1[pas1].param }]
                                                }
                                            }
                                            let rule = wasm.rule(
                                                this.state.rules[pas].head_name,
                                                head_parameter,
                                                [
                                                    {
                                                        name: this.state.rules[pas].ids_name,
                                                        ids: ids_parameter
                                                    },

                                                ]
                                            )
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
                                            }
                                            // console.log(head_parameter)
                                            let ids_parameter1 = [...this.state.caveats[pas].ids_parameter];

                                            let ids_parameter = [];

                                            for (let pas1 = 0; pas1 < ids_parameter1.length; pas1++) {
                                                if (ids_parameter1[pas1].type === "variable") {
                                                    ids_parameter = [...ids_parameter, { variable: parseInt(ids_parameter1[pas1].param) }]
                                                }
                                                else if (ids_parameter1[pas1].type === "string") {
                                                    ids_parameter = [...ids_parameter, { string: ids_parameter1[pas1].param }]
                                                }
                                                else if (ids_parameter1[pas1].type === "symbol") {
                                                    ids_parameter = [...ids_parameter, { symbol: ids_parameter1[pas1].param }]
                                                }
                                            }
                                            let rule = wasm.rule(
                                                this.state.caveats[pas].head_name,
                                                head_parameter,
                                                [
                                                    {
                                                        name: this.state.caveats[pas].ids_name,
                                                        ids: ids_parameter
                                                    },

                                                ]
                                            )
                                            builder.addAuthorityCaveat(rule);
                                        }
                                    }




                                    try {
                                        let token = builder.build(loadKeys())
                                        let serialized = token.toVec();
                                        let b64 = btoa(String.fromCharCode(...serialized));

                                        this.setState({ token: token.toVec(), valueEncoded: b64, valueDecoded: token.print() });
                                    } catch (error) {
                                        this.setState({ gen_err: "You must generate your keypair before generating your token !" });
                                    }

                                }}

                                > Generate your new token </button>
                                <div id="verification_result">{this.state.gen_err}</div>

                            </div>
                        </div>
                    </div>
                    <br />
                    <h1 className="mr-5">Token Attenuation </h1>

                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label> <small> paste a token to attenuate here</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.valueEncodedToAttenuate} onChange={this.handleChange1_attenuation} rows="15" />
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
                    <h2 className="mr-5">Examples of Token Attenuation </h2>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Restrict Operation</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" placeholder="read" type="text" value={this.state.restrict} onChange={this.handleChange2} rows="1" />
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
                                    <label htmlFor="exampleFormControlTextarea1"><h5>Resource Prefix</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="/app/123" type="text" value={this.state.resource} onChange={this.handleChange3} rows="1" />

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

                                            this.setState({ tokenToAttenuate: token2.toVec(), valueEncodedToAttenuate: b64, valueDecodedToAttenuate: token2.print() });
                                        }
                                        catch (e) {
                                            this.setState({ resource_prefix_message: e.message })
                                        }

                                    }}>
                                    Resource Prefix
                                </button>
                                <div >{this.state.resource_prefix_message}</div>



                            </div>
                            <br />
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>Token Revocation</h5></label>
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
                                        }
                                        catch (e) {
                                            this.setState({ token_revocation_message: e.message })
                                        }

                                    }}>
                                    Expiration Date
                                </button>
                                <div >{this.state.token_revocation_message}</div>


                            </div>

                        </div>

                    </div>
                    <br />
                    <br />
                    <h2 className="mr-5">Keys Generation For Your Attenuated Token  </h2>
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

                                        this.setState({message_privateKey_attenuation : ""})
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
                    <div className="container-fluid mt-10" onChange={this.handleChange}>
                        <div className="row">
                            <div className="col-4"></div>

                            <div className="col-3">
                                <h2>Add a new rule</h2>

                            </div>
                        </div>
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

                            <div className="col-1">
                                <div className="row">
                                    <label >{`ids name `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.attenuation_ids_name}
                                        className="attenuation_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <HeadInput1Attenuation rules={attenuation_ids_parameter}



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















                        </div>
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <button className="col-10" onClick={async () => {
                                    try {

                                        this.setState({ attenuation_rule_adding_message: '' })

                                        if (this.state.attenuation_rule_counter === 0) {

                                            for (let pas = 0; pas < this.state.attenuation_number_of_added_rules_head + 1; pas++) {
                                                if (this.state.attenuation_head_name === "" || this.state.attenuation_head_parameter[pas].param === "" || this.state.attenuation_head_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 0; pas < this.state.attenuation_number_of_added_rules_ids + 1; pas++) {
                                                if (this.state.attenuation_ids_name === "" || this.state.attenuation_ids_parameter[pas].param === "" || this.state.attenuation_ids_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            console.log(this.state.attenuation_head_name);
                                            this.setState({
                                                attenuation_rules: [{ head_parameter: this.state.attenuation_head_parameter, ids_parameter: this.state.attenuation_ids_parameter, head_name: this.state.attenuation_head_name, ids_name: this.state.attenuation_ids_name }]
                                            });
                                        }
                                        else {
                                            for (let pas = 1; pas <= this.state.attenuation_number_of_added_rules_head; pas++) {
                                                if (this.state.attenuation_head_name === "" || this.state.attenuation_head_parameter[this.state.attenuation_head_parameter.length - pas].param === "" || this.state.attenuation_head_parameter[this.state.attenuation_head_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 1; pas <= this.state.attenuation_number_of_added_rules_ids; pas++) {
                                                if (this.state.attenuation_ids_name === "" || this.state.attenuation_ids_parameter[this.state.attenuation_ids_parameter.length - pas].param === "" || this.state.attenuation_ids_parameter[this.state.attenuation_ids_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            this.setState((prevState) => ({
                                                attenuation_rules: [...prevState.attenuation_rules, { head_parameter: this.state.attenuation_head_parameter, ids_parameter: this.state.attenuation_ids_parameter, head_name: this.state.attenuation_head_name, ids_name: this.state.attenuation_ids_name }]
                                            }));
                                        }
                                        this.setState({ attenuation_rule_adding_message: "Your new rule has been added" });

                                        this.setState({ attenuation_rule_counter: this.state.attenuation_rule_counter + 1 })

                                    }

                                    catch (e) {
                                        this.setState({ attenuation_rule_adding_message: e.message })
                                    }

                                }}>add rule</button>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-2 mr-2 ml-5 ">
                                <div id="attenuation_rule_adding_result">{this.state.attenuation_rule_adding_message}</div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-3">
                                <h2>Add a new fact</h2>

                            </div>
                        </div>
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


                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-1 ">
                                <button className="col-10" onClick={async () => {
                                    try {
                                        this.setState({ attenuation_fact_adding_message: '' })

                                        if (this.state.attenuation_fact_counter === 0) {
                                            for (let pas = 0; pas < this.state.attenuation_number_of_added_fact + 1; pas++) {
                                                if (this.state.attenuation_fact_head_name === "" || this.state.attenuation_fact_head_parameters[pas].param === "" || this.state.attenuation_fact_head_parameters[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            this.setState({
                                                attenuation_facts: [{ fact_head_parameters: this.state.attenuation_fact_head_parameters, fact_head_name: this.state.attenuation_fact_head_name, }]
                                            });
                                        }
                                        else {
                                            for (let pas = 1; pas <= this.state.attenuation_number_of_added_fact + 1; pas++) {
                                                if (this.state.attenuation_fact_head_name === "" || this.state.attenuation_fact_head_parameters[this.state.attenuation_fact_head_parameters.length - pas].param === "" || this.state.attenuation_fact_head_parameters[this.state.attenuation_fact_head_parameters.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))
                                                }
                                            }
                                            this.setState((prevState) => ({
                                                attenuation_facts: [...prevState.attenuation_facts, { fact_head_parameters: this.state.attenuation_fact_head_parameters, fact_head_name: this.state.attenuation_fact_head_name, }]
                                            }));
                                        }

                                        this.setState({ attenuation_fact_adding_message: "Your new fact has been added" });

                                        this.setState({ attenuation_fact_counter: this.state.attenuation_fact_counter + 1 })


                                    }
                                    catch (e) {

                                        this.setState({ attenuation_fact_adding_message: e.message })

                                    }

                                }}>add fact</button>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-2 mr-2 ml-5">
                                <div id="fact_adding_result">{this.state.attenuation_fact_adding_message}</div>

                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4"></div>

                            <div className="col-3">
                                <h2>add a new caveat</h2>

                            </div>
                        </div>
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

                            <div className="col-1">
                                <div className="row">
                                    <label >{`ids name `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.attenuation_caveat_ids_name}
                                        className="attenuation_caveat_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <CaveatInput1Attenuation rules={attenuation_caveat_ids_parameter}



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















                        </div>
                        <div className="row">
                            <br />
                            <div className="col-1"></div>

                            <div className="col-3 mr-2 ">
                                <button className="col-10" onClick={async () => {
                                    try {

                                        this.setState({ attenuation_caveat_adding_message: '' })

                                        if (this.state.attenuation_caveat_counter === 0) {
                                            for (let pas = 0; pas < this.state.attenuation_number_of_added_caveats_head + 1; pas++) {
                                                if (this.state.attenuation_caveat_head_name === "" || this.state.attenuation_caveat_head_parameter[pas].param === "" || this.state.attenuation_caveat_head_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 0; pas < this.state.attenuation_number_of_added_caveats_ids + 1; pas++) {
                                                if (this.state.attenuation_caveat_ids_name === "" || this.state.attenuation_caveat_ids_parameter[pas].param === "" || this.state.attenuation_caveat_ids_parameter[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }

                                            this.setState({
                                                attenuation_caveats: [{ head_parameter: this.state.attenuation_caveat_head_parameter, ids_parameter: this.state.attenuation_caveat_ids_parameter, head_name: this.state.attenuation_caveat_head_name, ids_name: this.state.attenuation_caveat_ids_name }]
                                            });
                                        }
                                        else {
                                            for (let pas = 1; pas <= this.state.attenuation_number_of_added_caveats_head; pas++) {
                                                if (this.state.attenuation_caveat_head_name === "" || this.state.attenuation_caveat_head_parameter[this.state.attenuation_caveat_head_parameter.length - pas].param === "" || this.state.attenuation_caveat_head_parameter[this.state.attenuation_caveat_head_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 1; pas <= this.state.attenuation_number_of_added_caveats_ids; pas++) {
                                                if (this.state.attenuation_caveat_ids_name === "" || this.state.attenuation_caveat_ids_parameter[this.state.attenuation_caveat_ids_parameter.length - pas].param === "" || this.state.attenuation_caveat_ids_parameter[this.state.attenuation_caveat_ids_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }

                                            this.setState((prevState) => ({
                                                attenuation_caveats: [...prevState.attenuation_caveats, { head_parameter: this.state.attenuation_caveat_head_parameter, ids_parameter: this.state.attenuation_caveat_ids_parameter, head_name: this.state.attenuation_caveat_head_name, ids_name: this.state.attenuation_caveat_ids_name }]
                                            }));
                                        }
                                        this.setState({ attenuation_caveat_adding_message: "Your new caveat has been added" });

                                        this.setState({ attenuation_caveat_counter: this.state.rule_counter + 1 })

                                    }
                                    catch (e) {
                                        this.setState({ attenuation_caveat_adding_message: e.message })
                                    }


                                }}>add caveat</button>
                            </div>

                        </div>

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
                                                }
                                                // console.log(head_parameter)
                                                let ids_parameter1 = [...this.state.attenuation_rules[pas].ids_parameter];

                                                let ids_parameter = [];

                                                for (let pas1 = 0; pas1 < ids_parameter1.length; pas1++) {
                                                    if (ids_parameter1[pas1].type === "variable") {
                                                        ids_parameter = [...ids_parameter, { variable: parseInt(ids_parameter1[pas1].param) }]
                                                    }
                                                    else if (ids_parameter1[pas1].type === "string") {
                                                        ids_parameter = [...ids_parameter, { string: ids_parameter1[pas1].param }]
                                                    }
                                                    else if (ids_parameter1[pas1].type === "symbol") {
                                                        ids_parameter = [...ids_parameter, { symbol: ids_parameter1[pas1].param }]
                                                    }
                                                }
                                                let rule = wasm.rule(
                                                    this.state.attenuation_rules[pas].head_name,
                                                    head_parameter,
                                                    [
                                                        {
                                                            name: this.state.attenuation_rules[pas].ids_name,
                                                            ids: ids_parameter
                                                        },

                                                    ]
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
                                                }
                                                // console.log(head_parameter)
                                                let ids_parameter1 = [...this.state.attenuation_caveats[pas].ids_parameter];

                                                let ids_parameter = [];

                                                for (let pas1 = 0; pas1 < ids_parameter1.length; pas1++) {
                                                    if (ids_parameter1[pas1].type === "variable") {
                                                        ids_parameter = [...ids_parameter, { variable: parseInt(ids_parameter1[pas1].param) }]
                                                    }
                                                    else if (ids_parameter1[pas1].type === "string") {
                                                        ids_parameter = [...ids_parameter, { string: ids_parameter1[pas1].param }]
                                                    }
                                                    else if (ids_parameter1[pas1].type === "symbol") {
                                                        ids_parameter = [...ids_parameter, { symbol: ids_parameter1[pas1].param }]
                                                    }
                                                }
                                                let rule = wasm.rule(
                                                    this.state.attenuation_caveats[pas].head_name,
                                                    head_parameter,
                                                    [
                                                        {
                                                            name: this.state.attenuation_caveats[pas].ids_name,
                                                            ids: ids_parameter
                                                        },

                                                    ]
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
                                    } catch (e) {
                                        this.setState({ gen_err_attenuation: e.message });
                                    }






                                }}

                                > Generate your new token </button>
                                <div>{this.state.gen_err_attenuation}</div>

                            </div>
                        </div>

                    </div>

                    <br />
                    <h1 className="mr-5">Token Verification </h1>
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
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>ENCODED</h5></label><small> paste a token to verify here</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.valueEncoded_verification} onChange={this.handleChange1_verification} rows="15" />
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
                    <h2 className="mr-5">Example of Token Verification </h2>

                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.resource_verify_example} placeholder="/app/123" onChange={this.handleChange4_example} rows="1" />
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
                    <h2 className="mr-5">Set Your Own Token Verification </h2>

                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h3>Add Ambient Data</h3></label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" type="text" value={this.state.resource_verify} placeholder="/app/123" onChange={this.handleChange4} rows="1" />
                                </div>



                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="form-group brown-border-focus">
                                    <label className="exampleFormControlTextarea1"><h5>Operation to verify on the resource</h5></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" type="text" value={this.state.restrict_verify} placeholder="read" onChange={this.handleChange5} rows="1" />
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


                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-2 mr-1 ">
                                <button className="col-10" onClick={async () => {
                                    try {
                                        this.setState({ verification_fact_adding_message: '' })

                                        if (this.state.verification_fact_counter === 0) {
                                            console.log("number of facts", this.state.verification_number_of_added_fact);
                                            for (let pas = 0; pas < this.state.verification_number_of_added_fact + 1; pas++) {
                                                if (this.state.verification_fact_head_name === "" || this.state.verification_fact_head_parameters[pas].param === "" || this.state.verification_fact_head_parameters[pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            this.setState({
                                                verification_facts: [{ fact_head_parameters: this.state.verification_fact_head_parameters, fact_head_name: this.state.verification_fact_head_name, }]
                                            });
                                        }
                                        else {
                                            for (let pas = 1; pas <= this.state.verification_number_of_added_fact + 1; pas++) {
                                                if (this.state.verification_fact_head_name === "" || this.state.verification_fact_head_parameters[this.state.verification_fact_head_parameters.length - pas].param === "" || this.state.verification_fact_head_parameters[this.state.verification_fact_head_parameters.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))
                                                }
                                            }
                                            this.setState((prevState) => ({
                                                verification_facts: [...prevState.verification_facts, { fact_head_parameters: this.state.verification_fact_head_parameters, fact_head_name: this.state.verification_fact_head_name, }]
                                            }));
                                        }

                                        this.setState({ verification_fact_adding_message: "Your new fact has been added" });

                                        this.setState({ verification_fact_counter: this.state.verification_fact_counter + 1 })


                                    }
                                    catch (e) {

                                        this.setState({ verification_fact_adding_message: e.message })

                                    }
                                }}>add fact</button>
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

                            <div className="col-1">
                                <div className="row">
                                    <label >{`ids name `}</label>
                                </div>
                                <div className="row">

                                    <textarea id="outlined-basic" label="ids" variant="outlined"
                                        type="text"
                                        value={this.state.verification_caveat_ids_name}
                                        className="verification_caveat_ids_name form-control"
                                    />

                                </div>
                            </div>

                            <CaveatInput1Verification rules={verification_caveat_ids_parameter}



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















                        </div>
                        <div className="row">
                            <div className="col-1"></div>

                            <div className="col-2 mr-2 ">
                                <button className="col-10" onClick={async () => {
                                    try {

                                        for (let pas = 0; pas < this.state.verification_number_of_added_caveats_head + 1; pas++) {
                                            if (this.state.verification_caveat_head_name === "" || this.state.verification_caveat_head_parameter[pas].param === "" || this.state.verification_caveat_head_parameter[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        for (let pas = 0; pas < this.state.verification_number_of_added_caveats_ids + 1; pas++) {
                                            if (this.state.verification_caveat_ids_name === "" || this.state.verification_caveat_ids_parameter[pas].param === "" || this.state.verification_caveat_ids_parameter[pas].type === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                            }
                                        }
                                        this.setState({ verification_caveat_adding_message: '' })


                                        if (this.state.verification_caveat_counter === 0) {
                                            for (let pas = 1; pas <= this.state.verification_number_of_added_caveats_head; pas++) {
                                                if (this.state.verification_caveat_head_name === "" || this.state.verification_caveat_head_parameter[this.state.verification_caveat_head_parameter.length - pas].param === "" || this.state.verification_caveat_head_parameter[this.state.verification_caveat_head_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            for (let pas = 1; pas <= this.state.verification_number_of_added_caveats_ids; pas++) {
                                                if (this.state.verification_caveat_ids_name === "" || this.state.verification_caveat_ids_parameter[this.state.verification_caveat_ids_parameter.length - pas].param === "" || this.state.verification_caveat_ids_parameter[this.state.verification_caveat_ids_parameter.length - pas].type === "") {
                                                    throw (SyntaxError("Incomplete data: all fields must be filled out"))

                                                }
                                            }
                                            this.setState({
                                                verification_caveats: [{ head_parameter: this.state.verification_caveat_head_parameter, ids_parameter: this.state.verification_caveat_ids_parameter, head_name: this.state.verification_caveat_head_name, ids_name: this.state.verification_caveat_ids_name }]
                                            });
                                        }
                                        else {
                                            if (this.state.verification_caveat_head_name === "" || this.state.verification_caveat_ids_parameter[this.state.verification_caveat_ids_parameter.length - 1].param === "" || this.state.verification_caveat_ids_parameter[this.state.verification_caveat_ids_parameter.length - 1].type === "" || this.state.verification_caveat_head_parameter[this.state.verification_caveat_head_parameter.length - 1].param === "" || this.state.verification_caveat_head_parameter[this.state.verification_caveat_head_parameter.length - 1].type === "" || this.state.verification_caveat_ids_name === "") {
                                                throw (SyntaxError("Incomplete data: all fields must be filled out"))
                                            }
                                            this.setState((prevState) => ({
                                                verification_caveats: [...prevState.verification_caveats, { head_parameter: this.state.verification_caveat_head_parameter, ids_parameter: this.state.verification_caveat_ids_parameter, head_name: this.state.verification_caveat_head_name, ids_name: this.state.verification_caveat_ids_name }]
                                            }));
                                        }
                                        this.setState({ verification_caveat_adding_message: "Your new caveat has been added" });

                                        this.setState({ verification_caveat_counter: this.state.rule_counter + 1 })

                                    }
                                    catch (e) {
                                        this.setState({ verification_caveat_adding_message: e.message })
                                    }


                                }}>add rule</button>
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
                                                    }
                                                    // console.log(head_parameter)
                                                    let ids_parameter1 = [...this.state.verification_caveats[pas].ids_parameter];

                                                    let ids_parameter = [];

                                                    for (let pas1 = 0; pas1 < ids_parameter1.length; pas1++) {
                                                        if (ids_parameter1[pas1].type === "variable") {
                                                            ids_parameter = [...ids_parameter, { variable: parseInt(ids_parameter1[pas1].param) }]
                                                        }
                                                        else if (ids_parameter1[pas1].type === "string") {
                                                            ids_parameter = [...ids_parameter, { string: ids_parameter1[pas1].param }]
                                                        }
                                                        else if (ids_parameter1[pas1].type === "symbol") {
                                                            ids_parameter = [...ids_parameter, { symbol: ids_parameter1[pas1].param }]
                                                        }
                                                    }
                                                    let rule = wasm.rule(
                                                        this.state.verification_caveats[pas].head_name,
                                                        head_parameter,
                                                        [
                                                            {
                                                                name: this.state.verification_caveats[pas].ids_name,
                                                                ids: ids_parameter
                                                            },

                                                        ]
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


