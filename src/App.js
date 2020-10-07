import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import TokenGen from './TokenGen'
import TokenAtt from './TokenAtt'
import TokenVer from './TokenVer'
import Footer from './footer'
import start from './start'
export class App extends Component {
  state = {

  };





  render() {
    return (
      <div className="App">
        <NavBar />
        {/* <Header />  */}
        <Route exact path="/">
          <Redirect to="/start" />
        </Route>
        <Route exact path="/tokengen" component={TokenGen} />
        <Route exact path="/start" component={start} />
        <Route exact path="/tokenatt" component={TokenAtt} />
        <Route exact path="/tokenver" component={TokenVer} />
        <br />
        {/* <Debugger /> */}


        <br /> <br />
        <Footer />



      </div>

    );
  }
}

export default App;
