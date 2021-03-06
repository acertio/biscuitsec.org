import React from "react"

const HeadInput = (props) => {
    return (
        props.rules.map((val, idx) => {
            let head_parameter_Id = `head_parameter-${idx}`, head_parameter_type_Id = `head_parameter_type-${idx}`;

            return (


                <div key={idx} className="col-3 ml-2">
                    <div className="row">

                        <div className="col-6 mr-3">
                            <div className="row">
                                <label >{`parameter h${idx+1}`}</label>

                            </div>
                            <div className="row">
                                <textarea label="head's parameter" variant="outlined"
                                    type="text"
                                    name={head_parameter_Id}
                                    data-id={idx}
                                    id={head_parameter_Id}
                                    value={props.rules[idx].param}
                                    className="head_parameter form-control"
                                />
                            </div>


                        </div>
                        <div className="col-0 mr-2 ml-2 ">
                            <div className="row">
                                <label  >{`type `}</label>
                            </div>
                            <div className="row">
                                <select 
                                    type="text"
                                    name={head_parameter_type_Id}
                                    data-id={idx}
                                    id={head_parameter_type_Id}
                                    value={props.rules[idx].type}
                                    className="head_parameter_type form-control"
                                >                                           
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
export default HeadInput