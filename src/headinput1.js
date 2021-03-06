import React from "react"

const HeadInput1 = (props) => {
    return (
        props.rules.map((val, idx) => {
            let ids_parameter_Id = `ids_parameter-${idx}`, ids_parameter_type_Id = `ids_parameter_type-${idx}`
            
            return (


                <div key={idx} className="col-3 ml-2 form-group">
                    <div className="row">

                        <div className="col-6 mr-3">
                            <div className="row">
                                <label >{`p${props.rule_idx}_${idx+1}`}</label>

                            </div>
                            <div className="row">
                                <textarea label="ids's parameter" variant="outlined"
                                    type="text"
                                    name={ids_parameter_Id}
                                    data-id={idx}
                                    id={ids_parameter_Id}
                                    value={props.rules[idx].param}
                                    className="ids_parameter form-control"
                                />
                            </div>


                        </div>
                        <div className="col-0 ml-2 mr-2">
                            <div className="row">
                                <label >{`type `}</label>
                            </div>
                            <div className="row">
                                <select
                                    type="text"
                                    name={ids_parameter_type_Id}
                                    data-id={idx}
                                    id={ids_parameter_type_Id}
                                    value={props.rules[idx].type}
                                    className="ids_parameter_type form-control">
                                    <option selected disabled hidden  value=''>select type</option>
                                    <option value="string">string</option>
                                    <option value="variable">variable</option>
                                    <option value="symbol">symbol</option>
                                    <option value="date">date</option>
                                    <option value="integer">integer</option>
                                </select>
                            </div>


                        </div>



                    </div>
                </div>



            )
            
            
        })

    )
}
export default HeadInput1