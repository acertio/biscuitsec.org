# biscuitsec.org
This is a playground for biscuit tokens. We developed this site to ease the understanding and usage of biscuit tokens.

The goal is to provide an equivalent of jwt.io (as opensource, as we think it's valuable for devs to better understand how it works). The user interface also helps when you just want to generate, attenuate or verify a token. 

The site is made using react, wasm and the biscuit rust library.


## Install

Use npm to install the required packages and start the server. Please follow these instructions to launch the server

`npm install`

`npm start`


## Deploy
The playground is deployed on netlify (using build command CI= npm run build), and available at https://www.biscuitsec.org


## Use cases
Our base scenario is a [car rental agency](./examples/car_rental_agency.md)

We implemented other self-contained examples, such as [xstate](https://github.com/acertio/ex_biscuit_xstate).


## Credit

Credit goes to clever cloud and its developers (notably Geoffroy Couprie) for the [core library](https://github.com/CleverCloud/biscuit). 

Playground was developed by Mohamed Rahji and Fabien Imbault.


## Todo
- [ ] support sealed biscuit, depends on [issue](https://github.com/CleverCloud/biscuit-rust/issues/12)
- [ ] remove all warnings
- [ ] provide detailed documentation (look for temporary links on https://www.w3schools.com)


