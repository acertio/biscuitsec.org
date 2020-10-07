import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        const mystyle= collapsed ? {textAlign:"right"} : {textAlign:"left"};
        return (
               
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                    <a aria-current="page" className="navbar navbar-light  active" href="/"><img className="navbar_logo img-fluid"
                        src={require('./img/biscuitsec_logo5.svg')} alt="open.acert.io" /></a>
                    
                    <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`${classOne}`} id="navbarResponsive">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item navbar-brand active">
                                <Link to="/start">Start</Link>

                            </li>
                            <li className="nav-item navbar-brand active">
                                <Link to="/tokengen">Generate</Link>

                            </li>
                            <li className="nav-item navbar-brand active">
                                <Link to="/tokenatt">Attenuate</Link>
                            </li>
                            <li className="nav-item navbar-brand active">
                                <Link to="/tokenver">Verify</Link>
                            </li>
                            
                            
                        </ul>
                        <li className="nav-item navbar-brand active" style={mystyle}>
                            <a href="https://github.com/acertio/biscuitsec.org">Github</a>
                            </li>
                        
                    </div>
            </nav>
        );
    }
}
export default NavBar;
// function NavBar() {

//     return (
//         // <nav className="navbar navbar-expand-lg navbar-light==  fixed-top " role="navigation">
//             <a aria-current="page" className="navbar navbar-light  active" href="/"><img className="navbar_logo img-fluid"
//                 src={require('./img/biscuitsec_logo5.svg')} alt="open.acert.io" /></a>

//         //     {/* <a className="navbar-brand1" >
//         //         <Link to="/debugger">Debugger</Link>
//         //     </a> */}
//         //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
//         //         aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         //         <span className="navbar-toggler-icon"></span>
//         //     </button>

//         //     <div className="collapse navbar-collapse in" id="navbarSupportedContent">
//                 <ul className="navbar-nav mr-auto">
//                     <li className="nav-item navbar-brand active">
//                         <Link to="/debugger">Debugger</Link>

//                     </li>
//                     <li className="nav-item navbar-brand active">
//                         <Link to="/documentation">Documentation</Link>
//                     </li>
//                     <li className="nav-item navbar-brand active">
//                         <Link to="/announcement">Announcement</Link>
//                     </li>
//                 </ul>
//         //     </div>
//         // </nav>
//         // <nav className="navbar  navbar-expand-lg navbar-default  navrbar-dark fixed-top navbar-expand-sm  p-0">


//         //     <div className="container">

//         //         <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"></span> </button>
//         //         <div className="collapse navbar-collapse" id="navbarNav">
//         //             { <ul className="navbar-nav">
//         //                 <li className="nav-item navbar-brand active">
//         //                     <Link to="/debugger">Debugger</Link>

//         //                 </li>
//         //                 <li className="nav-item navbar-brand active">
//         //                     <Link to="/documentation">Documentation</Link>
//         //                 </li>
//         //                 <li className="nav-item navbar-brand active">
//         //                     <Link to="/announcement">Announcement</Link>
//         //                 </li>
//         //             </ul>
//         //              }
//         //         </div>
//         //     </div>
//         // </nav>


//     );

// }
// export default NavBar;