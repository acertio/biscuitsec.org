import React from "react"
import HeadInput from "./headinput"
import HeadInput1 from "./headinput1"

import 'bootstrap/dist/css/bootstrap.min.css';

import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';


class Form extends React.Component {
  state = {

    head_parameter: [{ param: "" , type :""}], ids_parameter: [{ param: "", type : "" }], head_name: "", ids_name: ""
  }
  handleChange = (e) => {
    if (["head_parameter"].includes(e.target.className)) {
      let head_parameter = [...this.state.head_parameter]
      head_parameter[e.target.dataset.id].param = e.target.value
      this.setState({ head_parameter: head_parameter }, () => console.log(this.state.head_parameter))
    } else if (["ids_parameter"].includes(e.target.className)) {
      let ids_parameter = [...this.state.ids_parameter]
      ids_parameter[e.target.dataset.id].param = e.target.value
      this.setState({ ids_parameter: ids_parameter }, () => console.log(this.state.ids_parameter))
    }
    else if (["ids_parameter_type"].includes(e.target.className)) {
      let ids_parameter = [...this.state.ids_parameter]
      ids_parameter[e.target.dataset.id].type = e.target.value
      this.setState({ ids_parameter: ids_parameter }, () => console.log(this.state.ids_parameter))
    }
    else if (["head_parameter_type"].includes(e.target.className)) {
      let head_parameter = [...this.state.head_parameter]
      head_parameter[e.target.dataset.id].type = e.target.value
      this.setState({ head_parameter: head_parameter }, () => console.log(this.state.head_parameter))
    }
    else if (["head_name"].includes(e.target.className)) {
      this.setState({ head_name: e.target.value }, () => console.log(this.state.head_name))

    }
    else if (["ids_name"].includes(e.target.className)) {
      this.setState({ ids_name: e.target.value }, () => console.log(this.state.ids_name))
    }

  }

  addRule1 = (e) => {
    this.setState((prevState) => ({
      ids_parameter: [...prevState.ids_parameter, { param: "" }]
    }));
  }
  addRule = (e) => {
    this.setState((prevState) => ({
      head_parameter: [...prevState.head_parameter, { param: "" }]
    }));
  }

  render() {
    let head_parameter = [...this.state.head_parameter]
    let ids_parameter = [...this.state.ids_parameter]
    return (

      <div className="container-fluid mt-12" onChange={this.handleChange}>

        <div className="row">
          <div className="col-1"></div>

          <div className="col-1 mr-2">
            <div className="row">
              <label >{`head name `}</label>
            </div>
            <div className="row">

              <textarea  variant="outlined"
                type="text"
                value={this.state.head_name}
                className="head_name"
                id="head_name"
                row="1"

              />

            </div>
          </div>

          <HeadInput rules={head_parameter}
            type="text"
            value={this.state.head_name}
            className="head_parameter"
          />
          <div className="col-1 ">
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
              <label >{`ids_name `}</label>
            </div>
            <div className="row">

              <textarea id="outlined-basic" label="ids" variant="outlined"
                type="text"
                value={this.state.ids_name}
                className="ids_name"
              />

            </div>
          </div>

          <HeadInput1 rules={ids_parameter}
            type="text"
            value={this.state.ids_parameter}
            className="ids_parameter"


          />
          <div className="col-1 ">
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
        <button onClick={async () => {
          let head_parameter=[];
          for (let pas = 0; pas < this.state.head_parameter.length; pas++) {
          // Ceci sera exécuté 5 fois
          // À chaque éxécution, la variable "pas" augmentera de 1
          // Lorsque'elle sera arrivée à 5, le boucle se terminera.
          console.log(this.state.head_parameter[pas].type);
          if (this.state.head_parameter[pas].type==="Variable")
            {
              head_parameter=[...head_parameter,{ var : this.state.head_parameter[pas].param}]
            }
          
          console.log(head_parameter);

          // 
        }

        }}>test</button>

      </div>



    )
  }
}
export default Form