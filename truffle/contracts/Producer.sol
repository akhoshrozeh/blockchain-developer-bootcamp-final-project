// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/// @title A contract that stores all data about the Producer
/// @author Anthony Khoshrozeh
/// @notice This contract can be updated to represent a Producer's own tracks and licensed tracks
contract Producer {
    string prodName;
    address payable owner;
    uint idCounter; 

    /// @notice An array that contains all the Producer's tracks
    Track[] public tracks;

    /// @notice An array that contains all track licenses purchased by the Producer
    LicensedTrack[] public licensedTracks;

    mapping (uint => Track) idToTrack;

    // maps track id to exclusive license price
    mapping (uint => uint) excluPrice; 
    // maps track id to nonExclusive license price
    mapping (uint => uint) nonExcluPrice;

    // checks if Producer already has a license to a certain track
    mapping (address => mapping (uint => mapping (uint => bool))) private alreadyBought;
    
    enum LicenseType {Exclusive, NonExclusive}


    /// @notice An event for when a license is purchased by a Producer 
    event LicenseBought();

    struct Track {
        string name;
        string CID;
        uint trackID;
        address trackOwner;
    }

    /// @custom This trackID refers to the trackID from the 'owner'
    struct LicensedTrack {
        address owner;
        address owningContract;
        uint trackID;
        LicenseType license;
    }

    /// @notice Fallback function that reverts the txn
    fallback() external payable {
        revert();
    }

    /// @notice Receive function that reverts the txn; used as a fallback function
    receive() external payable {
        revert();
    }
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    /// @notice The _owner parameter is the account who called 'createProducer' in ProducerFactory.sol
    /// @param _prodName The name of the producer; the artist name
    /// @param _owner The EOA address of the owner of this contract;
    constructor(string memory _prodName, address payable _owner) {
        idCounter = 0;
        prodName = _prodName;
        owner = _owner;

    }

    /// @return Returns the producer's name of this contract
    function getName() public view returns(string memory) {
        return prodName;
    }

    /// @param _trackID Used to determine which track to update its price
    /// @param _price The price in Wei for an exclusive license of the track
    /// @notice Sets the price for an exclusive license of a track
    function setExclusivePrice(uint _trackID, uint _price) public isOwner {
        excluPrice[_trackID] = _price;
    }

    /// @param _trackID Used to determine which track to update its price
    /// @param _price The price in Wei for a non-exclusive license of the track
    /// @notice Sets the price for a non-exclusive license of a track
    function setNonExclusivePrice(uint _trackID, uint _price) public isOwner {
        nonExcluPrice[_trackID] = _price;
    }

    /// @param _trackID Unique Id used to select the track
    /// @return The exclusive license price for that track
    function getExclusivePrice(uint _trackID) public view returns(uint) {
        return excluPrice[_trackID];
    }

    /// @param _trackID Unique Id used to select the track
    /// @return The non-exclusive license price for that track
    function getNonExclusivePrice(uint _trackID) public view returns(uint) {
        return nonExcluPrice[_trackID];
    }

    /// @param _name The name of the track
    /// @param _CID The IPFS CID of the file of the track; this is created by user separately from the app
    /// @param _excluPrice The price of the an exclusive license in Wei
    /// @param _nonExcluPrice The price of the a non-exclusive license in Wei
    /// @notice Creates the track object and stores it in the contract's storage; unique id is set for it and updated
    function createTrack(string memory _name, string memory _CID, uint _excluPrice, uint _nonExcluPrice) public isOwner {
        Track memory t = Track(_name, _CID, idCounter, msg.sender);
        setExclusivePrice(idCounter, _excluPrice);
        setNonExclusivePrice(idCounter, _nonExcluPrice);
        idToTrack[idCounter] = t;
        tracks.push(t);
        idCounter += 1;
    }

    /// @param _owner The address of the owner of the contract that stores the desired track (owner of _contract)
    /// @param _contract The contract address of the contract that stores the desired track
    /// @param _trackID The unique ID of the desired track 
    /// @param _licenseType Specifies the type of license to buy
    /// @notice Buys a license for a track
    /// @dev _trackID is for the desired track w.r.t. it's own contract, not the contract buying of license for it
    function buyLicense(address payable _owner, address payable _contract,  uint _trackID, LicenseType _licenseType) 
        public payable {
        
        require(msg.sender != _owner);
        require(_owner != owner);
        require((_licenseType == LicenseType.Exclusive || _licenseType == LicenseType.NonExclusive),
         "Enter a valid LicenseType (0 or 1)");


        Producer seller = Producer(_contract);
        bool sent = false;
        uint _price;

        if (_licenseType == LicenseType.Exclusive) {
            require(alreadyBought[_owner][_trackID][0] == false);
            alreadyBought[_owner][_trackID][0] = true;
            _price = seller.getExclusivePrice(_trackID);
            require(msg.value >= _price);
            (sent, ) = _owner.call{value: _price}("");
            assert(sent == true);
            licensedTracks.push(LicensedTrack(_owner, _contract, _trackID,  LicenseType.Exclusive));
            emit LicenseBought();
        }

        else if (_licenseType == LicenseType.NonExclusive) {
            require(alreadyBought[_owner][_trackID][1] == false);
            alreadyBought[_owner][_trackID][1] = true;
            _price = seller.getNonExclusivePrice(_trackID);
            require(msg.value >= _price);
            (sent, ) = _owner.call{value: _price}("");
            require(sent == true);
            licensedTracks.push(LicensedTrack(_owner, _contract, _trackID,  LicenseType.NonExclusive));
            emit LicenseBought();
        }

    }

    /// @param _trackID The unique ID of the track
    /// @return The track object from storage
    function getTrack(uint _trackID) external view returns(Track memory) {
        return idToTrack[_trackID];
    }

    /// @return All tracks created by owner
    function getTracks() public view returns(Track[] memory) {
        return tracks;
    }

    /// @return All tracks the contract owner has bought a license to
    function getLicensedTracks() public view returns(LicensedTrack[] memory) {
        return licensedTracks;
    }

    

    
}