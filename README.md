# README
My final project is a dApp that serves as a marketplace for producers to buy and sell licenses for tracks. Users can check which producers/artists are authorized to use other producers'/artists' tracks.

## Deployed Application
https://hopeful-franklin-f7fc17.netlify.app

## Running Locally (with Ganache GUI)
### Setting up the repo
1. Clone the repo by running `git clone https://github.com/akhoshrozeh/blockchain-developer-bootcamp-final-project.git`
2. Dependencies are already included in `node_modules`, but run `npm install` to be safe.

### Setting up the local network
1. Open Ganache and create a new project with `truffle_config.js` 
2. Set Network ID to 5777 and port number 8545
3. In your terminal, run `truffle migrate --network development` to deploy contracts to your local blockchain 

### Setting up the Front End
1. Go to `/truffle/` and run `./copy_abis.sh` to copy the contract artifacts to the `/front-end` directory. If you get a permission error in terminal, run `chmod +x copy_abis.sh` you enable execution permission. 
2. Go to `/front-end/` and change the variable `const factoryAddress` in all `.js` files to `const factoryAddress="{Contract Address of deployed ProducerFactory.sol contract}". This makes sure your front-end is interacting with the correct contract. It is currently set to the contract address of the deployed contract on Rinkeby.
3. You can either simply open `/front-end/index.html` in your browser. Alternatively, you can open the directory in VS Code, right click on `index.html` and click `Open with Live Server`. You need to first have the Live Share extension in VS Code installed for this. This spins up a local server and any changes to a file are automatically reflected in the app (no need to keep refreshing).
4. Once the app is running, make sure you have MetaMask installed in your browser. You should use Chrome, as Brave Browser was having some issues connecting. 
5. Change the Network in MetaMask to `LocalHost 8545` or if you don't have it, set it up with the same network ID and port number as you did in Ganache. 
6. Import the accounts from Ganache by importing the mnemonic from Ganache. You should see 10 accounts in your MetaMask with the same addresses and funds as in Ganache. 

## Running Tests
Tests for both `ProducerFactory.sol` and `Producer.sol` are in `/truffle/test/1_producerFactory-tests.js`
1. Go to `/truffle/` directory
2. Run `truffle test`

## Deploying your own ProducerFactory to a testnet (Rinkeby)
### Create an Infura account



## General Architecture (UML diagrams in progress)
### Smart Contracts
1. An ProducerFactory contract, that allows users to create a producer account. 
2. An Producer contract, generated from the factory, which has the following member variables: 
  (a) The owner's address, where other users can send ether to for licenses. 
  (b) A list of Tracks
  (c) Each contract has persistent storage of their work and also.
  (d) mappings of TrackID to their license price (in USD).



## Workflow (How to use the app)
### Selling Tracks
1. If the user is unregistered as an producer, they will click a button "Register as Producer"
2. For simplicity, we can assume one public address can only register as one artist.
3. Once they are registered, they can go to their own page and click "Sell"
4. They can then upload their audio files, select the title, etc. and then click "Create"
5. The audio files will then be stored on IPFS, their CIDs into their own Artist contract, and now they can earn money from buyers.


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
