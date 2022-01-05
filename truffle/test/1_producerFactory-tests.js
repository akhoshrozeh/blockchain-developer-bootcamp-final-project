const ProducerFactory = artifacts.require("ProducerFactory");
const truffleAssert = require('truffle-assertions');
const fs = require('fs');



// Helper function takes the address of a user who owns a producer contract
// it creates & returns a Contract object from the address and ABI
async function makeContract(owner) {
    let factory = await ProducerFactory.deployed();
    // let p0 = await factory.createProducer("test");
    let p0 = await factory.getOwnersContract(owner);
    let jsonFile = "./build/contracts/Producer.json";
    let parsed = JSON.parse(fs.readFileSync(jsonFile));
    let prodABI = parsed.abi;
    let p0contract = new web3.eth.Contract(prodABI, p0);
    return p0contract;
}

contract('ProducerFactory', async accounts => {
    /*
    NOTE:   The following tests are for ProducerFactory.sol. 
            Producer.sol is tested below that but under the same test suite. 
    */

    // Checks that new ProducerFactory contract has no deployed Producers
    it("returns no producers", async() => {
        const factory = await ProducerFactory.deployed();
        let producers = await factory.getProducers()
        assert.equal(producers.length, 0);
    });

    // Creates 10 Producers and checks they are all stored in the ProducerFactory contract
    it("returns correct number of producers", async() => {
        const factory = await ProducerFactory.deployed();
        for(let i = 0; i < 10; i++) {
            await factory.createProducer(i.toString(), {from: accounts[i]});
        }
        let producers = await factory.getProducers()
        assert.equal(producers.length, 10);
    });

    // Checks that all owner addresses of Producers are mapped in the ProducerFactory contract
    it("created producers exist in mapping", async() => {
        const factory = await ProducerFactory.deployed();
        let res = true;
        for(let i = 0; i < 10; i++) {
            let exists = await factory.producerExists(accounts[i]);
            if (exists === false) {
                res = false;
                break;
            }
        }
        assert.equal(res, true);
    });

    // Checks a nonexistent user doesn't exist in the mapping 
    it("nonexistent producer returns false", async() => {
        let factory = await ProducerFactory.deployed();
        assert.equal(false, await factory.producerExists("0xc0ffee254729296a45a3885639AC7E10F9d54979"));
    });

    // Checks the contract address of a Producer is correctly stored
    it("retrival of owner's contract", async() => {
        let factory = await ProducerFactory.deployed();
        let contractAddr = await factory.getProducers();
        contractAddr = contractAddr[5];
        assert.equal(contractAddr, await factory.getOwnersContract(accounts[5]));
    });

    // Checks the the same EOA account can't create multiple Producer contracts. 
    // This could later be changed but it is part of the design as of right now. 
    it("multiple calls to createProducer() from same address revert", async() => {
        let factory = await ProducerFactory.deployed();
        await truffleAssert.reverts(factory.createProducer("dj dude"));
    });


    // ************** Testing Producer.sol functionalties ************

    // Checks the we can instantiate the Contract object from contract address and its ABI
    it("instantiate contract from address and abi; gets name", async() => {
        let p0 = await makeContract(accounts[0]);
        // console.log(await p0.methods.getName().call());
        let name = await p0.methods.getName().call()
        assert.equal("0", name);
    });

    // Checks that when a Producer creates a contract it is stored correctly in that contract
    // Also checks proper querying of its license prices
    it("creates a track with correct information", async() => {
        let p0 = await makeContract(accounts[0]);
        await p0.methods.createTrack("track1", "cid1", 20, 10).send({from: accounts[0], gas:1000000});
        
        let tracks = await p0.methods.getTracks().call();
        let numTracks = tracks.length;
        let exPrice = await p0.methods.getExclusivePrice(0).call();
        let nonExPrice = await p0.methods.getNonExclusivePrice(0).call();
        
        assert.equal(numTracks, 1);
        assert.equal(tracks[0].name, "track1");
        assert.equal(tracks[0].CID, "cid1");
        assert.equal(parseInt(tracks[0].trackID), 0);
        assert.equal(tracks[0].trackOwner.toString(), accounts[0]);
        assert.equal(parseInt(exPrice), 20);
        assert.equal(parseInt(nonExPrice), 10);


    });

    // Checks that a contract can correcly update the license prices
    it("changing track license prices", async() => {
        let p0 = await makeContract(accounts[0]);
        await p0.methods.setExclusivePrice(0, 100).send({from: accounts[0], gas:1000000});
        await p0.methods.setNonExclusivePrice(0, 50).send({from: accounts[0], gas:1000000});

        let exPrice = await p0.methods.getExclusivePrice(0).call();
        let nonExPrice = await p0.methods.getNonExclusivePrice(0).call();

        assert.equal(exPrice, 100);
        assert.equal(nonExPrice, 50);
        
    });


    // Checks that a Producer can a buy a license to another Producer's track and correctly stores the Licensed Track
    // Also checks that the correct amount of Wei was charged
    it("buys license and stores license; checks balance", async() => {
        const factory = ProducerFactory.deployed();
        let p0 = await makeContract(accounts[0]);
        let p1 = await makeContract(accounts[1]);
        let _value = await p0.methods.getExclusivePrice(0).call();
        
        // p1 buys license for p0's track (created above)
        let beforeBalance = await web3.eth.getBalance(accounts[0]);
        let bytes = await p1.methods.buyLicense(accounts[0], p0._address, 0, 0).send({from: accounts[1], value:1000, gas: 1000000});
        let afterBalance = await web3.eth.getBalance(accounts[0]);
    
            
        let tracks = await p1.methods.getLicensedTracks().call();

        afterBalance = BigInt(afterBalance);
        beforeBalance = BigInt(beforeBalance);
        let deltaWei = afterBalance - beforeBalance;
        deltaWei = Number(deltaWei);
        assert.equal(deltaWei, 100);
        assert.equal(tracks.length, 1);
        assert.equal(tracks[0].owner, accounts[0]);
        assert.equal(tracks[0].owningContract, p0._address);
        assert.equal(tracks[0].trackID, 0);
        assert.equal(tracks[0].license, 0);

    });



});
