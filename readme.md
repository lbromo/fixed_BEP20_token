# Getting Started
Build using the [Truffle suite](https://www.trufflesuite.com/).

## Install dependencies
1. install nodejs and npm (instuctions [here](https://www.npmjs.com/get-npm))
2. install truffle globally: `(sudo) npm install truffle -g`
3. install [Ganache](https://www.trufflesuite.com/ganache)
We'll use this to setup a local development blockchain
4. install [Metamask](https://metamask.io/) as a add-on for your browser. 
This is the wallet we'll use to interact with the block chain

## Setting up a develop environment
1. Start a Ganache server (quick start is fine)
2. Copy a private-key from the Ganache server and import it to Metamask
3. Deploy the smart contract: `truffle migrade`
4. Run the npm development server: `npm run dev`

You can find the addresse of the Bromos€ token and add that in the metamask, and buy and sell Bromos€ tokens on the website.