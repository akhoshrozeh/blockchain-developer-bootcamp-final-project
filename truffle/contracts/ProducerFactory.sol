pragma solidity >=0.5.16 <0.9.0;
pragma experimental ABIEncoderV2;

import './Producer.sol';

contract ProducerFactory {
    Producer[] producers;
    mapping (address => Producer) private addressToProdID;
    mapping (address => bool) private isProducerMap;

    struct Track {
        string name;
        string CID;
        uint trackID;
        address trackOwner;
    }

    event ProducerCreated(address owner);

    modifier isProducer() {
        require(isProducerMap[msg.sender] == true);
        _;
    }

    function createProducer(string memory _name) public {
        Producer p = new Producer(_name, msg.sender);
        addressToProdID[msg.sender] = p;
        producers.push(p);
    }

    function getProducers() public view returns(Producer[] memory) {
        return producers;
    }

    function getProducer(address _prodAddr) public view returns(Producer) {
        return addressToProdID[_prodAddr];
    }

    // function getTrack(address _owner, uint _trackID) public returns(Track memory){
    //     return addressToProdID[_owner].getTrack(_trackID);
    // }

    // function getTracks(address _owner) public returns (Track[] memory) {
    //     return addressToProdID[_owner].getTracks();
    // }


    // // should use the mapping
    // function verifyExlusiveLicense(address _owner, address _licenseHolder, uint _trackID) public returns(bool) {
    //     return addressToProdID[_owner].hasExclusiveLicense(_licenseHolder, _trackID);
    // }

    // function verifyNonExlusiveLicense(address _owner, address _licenseHolder, uint _trackID) public returns(bool) {
    //     return addressToProdID[_owner].hasNonExclusiveLicense(_licenseHolder, _trackID);
    // }

}