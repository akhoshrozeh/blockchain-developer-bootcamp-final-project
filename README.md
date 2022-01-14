# README
## Overview
My final project is a dApp that serves as a marketplace for producers to buy and sell licenses for tracks/beats. Users can check which producers/artists are authorized to use other producers'/artists' tracks.

## Deployed Application
https://hopeful-franklin-f7fc17.netlify.app

## Running Locally (with Ganache GUI)
### Note: These steps setup a new ProducerFactory contract and run 
### Setting up the repo
1. Clone the repo by running `git clone https://github.com/akhoshrozeh/blockchain-developer-bootcamp-final-project.git`
2. Use `Node 12.19.0`
3. Dependencies are already included in `node_modules`, but run `npm install` to be safe.

### Setting up the local network
1. Go to `/truffle` and run `truffle compile`
2. Open Ganache and click `New Workspace` and then click `Add a project` and select `truffle_config.js` inside `/truffle` 
3. Set Network ID to 5777 and port number 8545 under Settings->Server.
4. In your terminal, run `truffle migrate --network development` to deploy contracts to your local blockchain 

### Setting up the Front End
1. Go to `/truffle` and run `./copy_abis.sh` to copy the contract artifacts to the `/front-end` directory. If you get a permission error in terminal, run `chmod +x copy_abis.sh` you enable execution permission. 
2. Go to `/front-end` and change the variable `const factoryAddress` in all `.js` files to `const factoryAddress="{Contract Address of deployed ProducerFactory.sol contract}". This makes sure your front-end is interacting with the correct contract. It is currently set to the contract address of the deployed contract on Rinkeby.
3. You can open the directory in VS Code, right click on `index.html` and click `Open with Live Server`. You need to first have the Live Share extension in VS Code installed for this. This spins up a local server and any changes to a file are automatically reflected in the app (no need to keep refreshing). You need to run your script from a local server, opening the file directly with a browser will not work (ES6 modules are subject to same-origin policy). If you don't have VS Code, you can spin up a server by running `python3 -m http.server --cgi 8080` in the `/front-end` directory.
4. Once the app is running, make sure you have MetaMask installed in your browser. You should use Chrome, as Brave Browser was having some issues connecting. 
5. Change the Network in MetaMask to `LocalHost 8545` or if you don't have it, set it up with the same network ID and port number as you did in Ganache. 
6. Import the accounts from Ganache by importing the mnemonic from Ganache. You should see 10 accounts in your MetaMask with the same addresses and funds as in Ganache. 

## Running Tests
Tests for both `ProducerFactory.sol` and `Producer.sol` are in `/truffle/test/1_producerFactory-tests.js`
1. Go to `/truffle` directory
2. Make sure your local blockchain is running (Ganache)
3. Run `truffle test`

## Deploying your own ProducerFactory to a testnet (Rinkeby)
### Setting up Infura Project
1. Go to https://infura.io/
2. Create an Infura account or sign in to an existing account and select `Create a New Project`.  

### .env file
1. Create a file called `.env` in `/truffle`
2. Write your Infura credentials to file. Your `.env` should look like this:  \
    `MNEMONIC="{Your MNEMONICs}"` \
    `INFURA_URL={Your Infura endpoint URL}`
**!! IMPORTANT: Make sure you add the `.env` file to `.gitignore`. Otherwise you won't have protected your private key.**
3. Add this at the top of your `truffle_config.js` file:
  ```
  const HDWalletProvider = require('@truffle/hdwallet-provider');
  const dotenv = require('dotenv');
  dotenv.config();
  const mnemonic = process.env.MNEMONIC;
  ```
4. Add this under `module.exports` and under `networks` to target the Rinkeby network:
  ```
      rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, process.env.INFURA_URL),
      network_id: "4",
      gas: 5500000
    }
  ```
5. Then run `truffle migrate --network rinkeby`. Note: Make sure you have Eth in your Ethereum account on the Rinkeby network. You can get some from https://faucets.chain.link/rinkeby


## General Architecture 
### Smart Contracts
1. An ProducerFactory contract, that allows users to create a producer account. 
2. An Producer contract, generated from the factory, which has the following member variables: 
  (a) The owner's address, where other users can send ether to for licenses. 
  (b) A list of Tracks
  (c) A list of Licensed Tracks
  (d) mappings of TrackID to their license (exclusive and non-exclusive) price (Wei).



## Workflow (How to use the app)
1. Register as an producer.
2. Create a track.
3. View other Producers' profiles by setting URL to `https://hopeful-franklin-f7fc17.netlify.app/user.html?contractOwner={Contract Owner Address}`
### Buying another Producer's Track
1. Go to their profile page.
2. Select the desired Track.
3. Click 'Buy Exclusive License' or 'Buy Non-Exclusive License'
4. Track will appear on your profile under 'Licensed Tracks' once transaction is complete (may need to refresh page once txn is complete).

### Adjusting Track Price
1. Go to your profile by clicking the 'Profile' button at the top left.
2. Select the Track you wish to adjust.
3. Enter the value the value (in Wei) in the text input.
4. Click either 'Set Exclusive Price' or 'Set Non-Exclusive Price'.

### Purchasing Licenses for Tracks
1. Users can search the wesbite for producers by name or by address.
2. Each producer has a page containing their tracks.
3. Each track will have a price for an exclusive and non-exclusive license.
4. A user can click to purchase the license through Metamask once they've created an account. 
5. Once the transaction is complete, the buyer's Producer contract will be updated with data that will verify they have a license. 


## Possible Extensions for the Future
1. Rebuild the frontend with React instead of pure HTML/CSS/JS
2. In-app IPFS file upload component.
3. In-app track player.
4. Multiple Producer contracts from single EOA. 
5. Set prices in USD and use oracle price feeds to dynamically alter the price to pay in Eth. 
6. A ProducerFactory could be thought of as a record label. The owner of this contract receives a portion of all track purchases when a producer/artist "signs" with them.
