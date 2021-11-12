# README
My final project is to create a dApp that serves as a marketplace for producers to license tracks. This dApp serves to act as single, public platform where producers can sell licenses to their tracks and also check which users are verified to use them.  

## General Architecture (UML diagrams in progress)
### Smart Contracts
1. An ProducerFactory contract, that allows users to create a producer account. 
2. An Producer contract, generated from the factory, which has the following member variables: 
  (a) The owner's address, where other users can send ether to for licenses. 
  (b) A list of Tracks
  (c) Each contract has persistent storage of their work and also.
  (d) mappings of TrackID to their license price (in USD).
  
### Oracle Price Feed
The dApp should let producers sell their work in USD, which means we'll need to oracle (Chainlink) to calculate what the price in ETH it should be at the moment of purchase. 



## Workflow
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

### Verification

### Design Issues
Currently not sure about the design of contracts holding who owns licenses to their contracts. It would be more memory efficient to have each Producer contract just hold their tracks and licenses they own. This will be updated soon. 
