import React from "react"

const ShowPredicate = (props) => {
    return (
        props.predicates.map((val, idx) => {
            let params="";
            let predicate=props.predicates[idx];
            console.log("predicate",predicate)
            for (let i=0;i<predicate.caveat_ids_parameter.length;i++)
            {   if (i===0)
                    params=params+predicate.caveat_ids_parameter[i].param
                else 
                    params=params+","+predicate.caveat_ids_parameter[i].param
            }
            return (


                <div key={idx} className={"ml-5"}>

                    <ul>
                    <li><div>{`predicate ${idx+1}: ${predicate.ids_name}(${params}) `}</div></li>

                    </ul>
                </div>



            )
        })

    )
}
export default ShowPredicate