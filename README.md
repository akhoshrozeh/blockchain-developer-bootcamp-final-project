# README
My final project is to create a dApp that serves as a marketplace for musicians. Websites like Bandcamp allow for artists to sell their work to buyers with for a fee (Bandcamp is 10% of all purchases). This application would allow for musicians to keep 100% of their profits. 

## General Architecture (UML diagrams in progress)
### Smart Contracts
1. An artist factory contract, that allows users that want to sell their work to create a contract that represents them and their work.
2. An artistContract, generated from the factory. 
  (a) The owner (musician) has a balance of purchases (possibly add a donations balance).
  (b) Data structure containing objects of their work (metadata).
  (a) Each contract should have some persistent storage that keeps track of the CIDs of their work. 
  Note: Not sure how to ensure only buyers can download the files from IPFS. I'm thinking about a way encrypt the files and store them on IPFS. During the transaction of buying some work, the user will gain access to the keys? Will research this further. 

### Oracle Price Feed
The dApp should let musicians sell their work in USD, which means we'll need to oracle (Chainlink) to calculate what the price in ETH it should be at the moment of purchase. 



## Workflow
### Selling Music
1. If the user is unregistered as an artist, they will click a button "Register as Artist"
2. For simplicity, we can assume one public address can only register as one artist.
3. Once they are registered, they can go to their own page and click "Sell"
4. They can then upload their audio files, select the title, etc. and then click "Create"
5. The audio files will then be stored on IPFS, their CIDs into their own Artist contract, and now they can earn money from buyers.

### Profits
1. Artists can go to their page to view their profits and click a button transfer that to their Metamask wallet.


### Purchasing Music
1. Users can search the wesbite for artists
2. Each artist has a page containing their songs/albums.
3. A user can click to purchase the file(s) through Metamask. 
4. Once the transaction is complete, the user will be gain access to the file(s) on IPFS they can then download.  

