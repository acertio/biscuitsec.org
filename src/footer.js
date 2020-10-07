import React from 'react'
import { SocialIcon } from 'react-social-icons';

function Footer() {

    return (


        <footer className="page-footer footer font-small  pt-4 bg-blue">

            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Biscuitsec playground</h5>
                        <p>Supported by <a style={{color:"#D1A26A"}}href="https://acert.io">acert.io</a> </p>
                    </div>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <div className="col-md-3 mb-md-0 mb-3">

                    </div>
                    <div className="col-md-1 mb-md-0 mb-3 ml-5">

                        <ul className="list-unstyled">
                            <li>
                                <div className="col-md-1 mb-md-0 mb-3">
                                    <ul className="list-unstyled">
                                        <li>
                                            <div >
                                            <SocialIcon network="twitter" url="https://twitter.com/acertHQ"  />

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </div>

                </div>

            </div>

            <div className="footer-copyright text-center py-3">© 2020 Copyright
        <a href="to_be_defined"> biscuitsec</a>
            </div>

        </footer>

    );

}
export default Footer;