import React from 'react'
//var createReactClass = require('create-react-class');

class Documentation extends React.Component {
    constructor() {
        super();
        this.state = { value: '' }
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }
    render() {
        return (
           <h1>doc works</h1>

        )
    }
}
export default Documentation;


