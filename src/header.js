import React from 'react'

function Header(){

    return (
        <section className="banner-biscuit mr-2">
    <div className="container header">
        <br />
        <a className="logo" href="/"><img src={require('./img/biscuitsec_logo.svg')} alt="logo"/></a>
        <br />
        <a className="logo" href="/"><img src={require('./img/biscuitsec.svg')} alt="logo"/></a>
        <h1 > playground </h1>

        {/* <p>Biscuit Web Tokens are an open, industry standard RFC xxxx method for representing claims securely between
            two parties.</p>
        <p>Biscuitsec.io allows you to decode,modify, verify and generate your web token .</p> */}
    </div>
</section>
        );

}
export default Header;