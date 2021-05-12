import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            message_encoded_attenuation: '', message_encoded: '', message_privateKey: '', message_privateKey_own_verification: '', message_privateKey_attenuation: '',
            copied:false,

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
    copy() {
        this.setState({copied:true})
        const el = this.textArea
        el.select()
        document.execCommand("copy")
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
    addPredicate_rule = async (e) => {
        this.setState({ rule_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));

        if (this.state.rule_body.length === 0) {
            this.setState({
                rule_body: [{ ids_name: this.state.ids_name, rule_ids_parameter: this.state.ids_parameter }], ids_name: "", ids_parameter: [{ param: "", type: "" }], rule_predicate_adding: "your predicate has been added", rule_idx: this.state.rule_idx + 1

            })
            await new Promise(r => setTimeout(r, 1000));

        }
        else {
            this.setState((prevState) => ({

                rule_body: [...prevState.rule_body, { ids_name: this.state.ids_name, rule_ids_parameter: this.state.ids_parameter }], ids_name: "", ids_parameter: [{ param: "", type: "" }], rule_predicate_adding: "your predicate has been added", rule_idx: this.state.rule_idx + 1


            }));
        }
        await new Promise(r => setTimeout(r, 1000));

        console.log("rule body", this.state.rule_body);
        console.log("rule_idx", this.state.rule_idx);

    }
    addPredicate_caveat = async (e) => {
        this.setState({ caveat_predicate_adding: "" })
        await new Promise(r => setTimeout(r, 500));

        if (this.state.caveat_body.length === 0) {
            this.setState({
                caveat_body: [{ ids_name: this.state.caveat_ids_name, caveat_ids_parameter: this.state.caveat_ids_parameter }], caveat_ids_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1,

            })
            await new Promise(r => setTimeout(r, 1000));

        }
        else {
            this.setState((prevState) => ({

                caveat_body: [...prevState.caveat_body, { ids_name: this.state.caveat_ids_name, caveat_ids_parameter: this.state.caveat_ids_parameter }], caveat_ids_name: "", caveat_ids_parameter: [{ param: "", type: "" }], caveat_predicate_adding: "your predicate has been added", caveat_idx: this.state.caveat_idx + 1
            }));
        }
        await new Promise(r => setTimeout(r, 1000));

        console.log("caveat body", this.state.caveat_body);
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





        return (
            <div>
                {/* <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="text" value={this.state.value} onChange={this.handleChange}/> */}
                <div className="container-fluid">
                    <section className="banner-biscuit mr-2">
                        <div className="container header">
                            <br /><br />
                            <a className="hero" href="/"><img src={require('./img/biscuitsecHero.png')} alt="hero" /></a>
                            <br />

                            {/* <p>Biscuit Web Tokens are an open, industry standard RFC xxxx method for representing claims securely between
            two parties.</p>
        <p>Biscuitsec.io allows you to decode,modify, verify and generate your web token .</p> */}
                        </div>
                    </section>
                    <div className="warning">
                        <div className="text-center">
                            <strong>Biscuitsec:</strong>

                        Learn how the biscuit token works by interacting with it. For developers, the code of the application is available on <a href="https://github.com/acertio/biscuitsec.org">GitHub</a>.
                        </div>
                    </div>                    <h1 className="mr-5 text-center">Token Example </h1>

                    <br />
                    <h2 className="mr-5 ml-5">Root Keys Generation </h2>
                    <div className="mr-5 ml-5">Biscuits use public key cryptography. You can either use an existing public/private keypair, or we'll generate one for you.<br /> Please note this site does not record neither the provided keys nor the generated tokens. </div>
                    <br />
                    <div className="container-fluid mt-12">
                        <div className="row">
                            <div className="col-md-5 ml-5">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2"><h5>Public Key</h5></label> <small> press the button to generate your keys</small>
                                    <textarea  className="form-control" id="exampleFormControlTextarea2" type="text" readOnly value={this.state.publicKey} rows="2" />
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
                    <h2 className="ml-5">Predefined token </h2>
                    <div className="ml-5">This predefined token illustrate an example of rental car agency management.<br /> To read the explanation and the code of this example click <a href="https://www.w3schools.com/">here</a></div>
                    <br />
                    <div className="container-fluid mt-10">
                        <div className="row">
                            <div className="col-md-5 ml-5">

                                <div className="textarea-container">
                                    <label ><h5>ENCODED</h5></label>
                                    <textarea className="form-control" ref={(textarea) => this.textArea = textarea} id="exampleFormControlTextarea2" readOnly value={this.state.valueEncoded_example} onChange={this.handleChange1_example} rows="15" />
                                    <a onClick={() => this.copy()}>{btnText}</a>

                                </div>

                                <div>{this.state.message_encoded_example}</div>
                            </div>
                            <div className="col-md-5 ml-5">
                                <div className="textarea-container">
                                    <label htmlFor="exampleFormControlTextarea1"><h5>DECODED</h5></label><small> your result</small>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" readOnly type="text" value={this.state.valueDecoded_example} onChange={this.handleChangee_example} rows="15" />

                                </div>
                                    <br />
                                <button
                                    onClick={async () => {
                                        this.setState({ gen_err_example: '' })
                                        let builder = new wasm.Biscuit()


                                        let fact = wasm.fact("right", [
                                            wasm.string("car1"),
                                            wasm.symbol("drive")
                                        ])
                                        builder.addAuthorityFact(fact)

                                        fact = wasm.fact("right", [
                                            { string: "car2" },
                                            { symbol: "drive" }
                                        ])
                                        builder.addAuthorityFact(fact)
                                        fact = wasm.fact("right", [
                                            { string: "car3" },
                                            { symbol: "drive" }
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

                                <div id="verification_result">{this.state.gen_err_example}</div>

                            </div>
                        </div>

                    </div>


























                </div>







            </div >
        )
    }
}
export default TokenGen;


