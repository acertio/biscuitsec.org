import React from 'react'

function Footer() {

    return (


        <footer className="page-footer footer text-center pt-4 bg-blue">

            <div className="container">

                ⭐️ <a href="https://github.com/acertio/biscuitsec.org">If you like the playground, give it a star on Github</a>! ⭐️

                <p>Powered by <img src={require('./img/acertWhiteLogo.png')} href="www.acert.io" alt="acert.io" /></p>
            </div>

        </footer>

    );

}
export default Footer;