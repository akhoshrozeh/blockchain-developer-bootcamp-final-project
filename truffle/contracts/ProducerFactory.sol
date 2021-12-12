pragma solidity 0.8.10;
// pragma solidity >=0.5.16 <0.9.0;
// pragma experimental ABIEncoderV2;
// farm enemy snake boss sunset wolf action humble motor donkey under cream
import './Producer.sol';

contract ProducerFactory {
    Producer[] producers;
    address[] public prodAddresses;
    mapping (address => Producer) private addressToProdID;
    mapping (address => bool) private producerExistsMap;
    mapping (address => address) private ownerToContract;

    // struct Track {
    //     string name;
    //     string CID;
    //     uint trackID;
    //     address trackOwner;
    // }

    event ProducerCreated(address owner);

    modifier isProducer() {
        require(producerExistsMap[msg.sender] == true);
        _;
    }

    function createProducer(string memory _name) public returns(address){
        require(producerExistsMap[msg.sender] == false);
        Producer p = new Producer(_name, payable(msg.sender));
        addressToProdID[msg.sender] = p;
        ownerToContract[msg.sender] = address(p);
        prodAddresses.push(address(p));
        producers.push(p);
        producerExistsMap[msg.sender] = true;
        emit ProducerCreated(msg.sender);
        return address(p);
    }

    function getProducers() public view returns(address[] memory) {
        return prodAddresses;
    }

    function getProducer(address _prodAddr) public view returns(Producer) {
        return addressToProdID[_prodAddr];
    }

    function producerExists(address _producer) public view returns(bool) {
        return producerExistsMap[_producer];
    }

    function getOwnersContract(address _owner) public view returns(address) {
        return ownerToContract[_owner];
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