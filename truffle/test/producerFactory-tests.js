const ProducerFactory = artifacts.require("ProducerFactory");
const Producer = artifacts.require("Producer");
const truffleAssert = require('truffle-assertions');


// * Things to test for ProducerFactory:
//* getProducers() returns addresses and correct number of them
//* getProducer() returns the correct txn obj
//* producerExists() is correct
//* getOwnersContract() is correct
//* cant create two Producer contracts from single address (txn reverts)


//* Things to test for Producer 
//* setExclusivePrice and setNonExclusivePrice work
//* getExclusivePrice and getNonExclusivePrice work
//* createTrack() correctly adds the track
//* buyLicense updates LicensedTrack[] and returns CID
//* getTrack() returns correct Track
//* getTracks() returns correct array of Tracks
//* getLicensedTracks() retusn correct list of licensedTracks

// notes: buyLicense should be rewritten
// values passed into function are the owner of the track to be bought, 
// the trackID from the owners POV, the license type, and the price to be paid
// curently, the contract references itself for the price, which is incorrect
// it's basically asking itself what the price is

// actually, i think LicensedTrack could be rewritten 
// could just be {Track, LicenseType}

// RHS is expected value, LHS is actual value 
contract('ProducerFactory', async accounts => {
    it("returns no producers", async() => {
        const factory = await ProducerFactory.deployed();
        let producers = await factory.getProducers()
        assert.equal(producers.length, 0);
    });

    it("returns correct number of producers", async() => {
        const factory = await ProducerFactory.deployed();
        for(let i = 0; i < 10; i++) {
            await factory.createProducer(i.toString(), {from: accounts[i]});
        }
        let producers = await factory.getProducers()
        assert.equal(producers.length, 10);
    });


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

    it("nonexistent producer returns false", async() => {
        let factory = await ProducerFactory.deployed();
        assert.equal(false, await factory.producerExists("0xc0ffee254729296a45a3885639AC7E10F9d54979"));
    });

    it("retrival of owner's contract", async() => {
        let factory = await ProducerFactory.deployed();
        let contractAddr = await factory.getProducers();
        contractAddr = contractAddr[5];
        assert.equal(contractAddr, await factory.getOwnersContract(accounts[5]));
    });

    it("multiple calls to createProducer() from same address revert", async() => {
        let factory = await ProducerFactory.deployed();
        await truffleAssert.reverts(factory.createProducer("dj dude"));
    });




});
