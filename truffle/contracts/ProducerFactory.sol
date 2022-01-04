// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import './Producer.sol';

/// @title A contract to get create and retrieve 'Producers'
/// @author Anthony Khoshrozeh
/// @notice You can use this contract to dynamically create 'Producer' contracts and retrieve 'Producer' contracts
contract ProducerFactory {
    Producer[] producers;

    /// @notice This array contains all contract addresses of 'Producers'
    address[] public prodAddresses;

    mapping (address => Producer) private addressToProdID;
    mapping (address => bool) private producerExistsMap;
    mapping (address => address) private ownerToContract;

    /// @param owner The owner of the contract
    /// @notice You can use this contract to dynamically create 'Producer' contracts and retrieve 'Producer' contracts
    event ProducerCreated(address owner);

    modifier isNotProducer() {
        require(producerExistsMap[msg.sender] == false);
        _;
    }

    /// @param _name The name of the Producer; equivalent to the artist's name
    /// @notice Creates the Producer contract and stores its address and txn receipt
    /// @return Returns the address of the Producer contract created
    function createProducer(string memory _name) public isNotProducer returns(address){
        Producer p = new Producer(_name, payable(msg.sender));
        addressToProdID[msg.sender] = p;
        ownerToContract[msg.sender] = address(p);
        prodAddresses.push(address(p));
        producers.push(p);
        producerExistsMap[msg.sender] = true;
        emit ProducerCreated(msg.sender);
        return address(p);
    }

    /// @notice Returns the list of all Producer contract addresses
    function getProducers() public view returns(address[] memory) {
        return prodAddresses;
    }

    /// @param _prodAddr The user's EOA address
    /// @notice Given an EOA address, it returns the corresponding Producer contract creation receipt
    function getProducer(address _prodAddr) public view returns(Producer) {
        return addressToProdID[_prodAddr];
    }

    /// @param _producer The user's EOA address
    /// @notice Returns true if this account has already created an address; false if they haven't
    function producerExists(address _producer) public view returns(bool) {
        return producerExistsMap[_producer];
    }

    /// @param _owner The user's EOA address
    /// @notice Given an EOA address, it returns the corresponding Producer contract address
    function getOwnersContract(address _owner) public view returns(address) {
        return ownerToContract[_owner];
    }


}