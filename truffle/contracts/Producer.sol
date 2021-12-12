pragma solidity 0.8.10;
// pragma solidity >=0.5.16 <0.9.0;
// pragma experimental ABIEncoderV2;

contract Producer {
    string prodName;
    address payable owner;
    uint idCounter; // used for the Producer's tracks (these are unique only to this contract!)

    // Tracks the producer owns/created
    Track[] public tracks;

    // Tracks the producer has licenses to
    LicensedTrack[] private licensedTracks;

    mapping (uint => Track) idToTrack;

    // maps track id to exclusive license price
    mapping (uint => uint) excluPrice; 
    // maps track id to nonExclusive license price
    mapping (uint => uint) nonExcluPrice;


    

    // trackID -> array of addresses 
    // mapping (uint => address[]) licensedProducers;  

    // address and trackID -> true if licensed
    // mapping (address => mapping(uint => bool)) private hasExclusiveLicenseMap;
    // mapping (address => mapping(uint => bool)) private hasNonExclusiveLicenseMap;
    

    enum LicenseType {Exclusive, NonExclusive}

    event Fallback(string m);
    event LicenseBought();

    struct Track {
        string name;
        string CID;
        uint trackID;
        address trackOwner;
    }

    // this trackID refers to the trackID from the owner
    struct LicensedTrack {
        address owner;
        address owningContract;
        uint trackID;
        LicenseType license;
    }

    fallback() external payable {
        emit Fallback("Fallback called.");
    }

    receive() external payable {
        revert();
    }
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier hasValidFunds(uint _price) {
        require(msg.value >= _price);
        _;
    }
    
    
    constructor(string memory _prodName, address payable _owner) {
        idCounter = 0;
        prodName = _prodName;
        owner = _owner;

    }

    function getName() public view returns(string memory) {
        return prodName;
    }
    function setExclusivePrice(uint _trackID, uint _price) public isOwner {
        excluPrice[_trackID] = _price;
    }
    function setNonExclusivePrice(uint _trackID, uint _price) public isOwner {
        nonExcluPrice[_trackID] = _price;
    }

    function getExclusivePrice(uint _trackID) public view returns(uint) {
        return excluPrice[_trackID];
    }

    function getNonExclusivePrice(uint _trackID) public view returns(uint) {
        return nonExcluPrice[_trackID];
    }

    // When a user uploads a new track; CID is created in browser
    function createTrack(string memory _name, string memory _CID, uint _excluPrice, uint _nonExcluPrice) public isOwner {
        Track memory t = Track(_name, _CID, idCounter, msg.sender);
        setExclusivePrice(idCounter, _excluPrice);
        setNonExclusivePrice(idCounter, _nonExcluPrice);
        idToTrack[idCounter] = t;
        tracks.push(t);
        idCounter += 1;
    }

    // a producer wants to buy a license for a track
    // only place licensedTracks gets updated
    // parameters should be the contract address, then we can get the owner from that to transfer funds.
    function buyLicense(address payable _owner, address payable _contract,  uint _trackID, LicenseType _licenseType) 
        public payable {
        require(msg.sender != _owner);
        require((_licenseType == LicenseType.Exclusive || _licenseType == LicenseType.NonExclusive),
         "Enter a valid LicenseType (0 or 1)");
        // string memory _CID;
        uint _price;
        Producer seller = Producer(_contract);
        bool sent = false;
        // require msg.sender isnt owner !!
        if (_licenseType == LicenseType.Exclusive) {
            _price = seller.getExclusivePrice(_trackID);
            require(msg.value >= _price);
            (sent, ) = _owner.call{value: _price}("");
            require(sent, "Failed to send Ether (Exclusive Purchase).");
            licensedTracks.push(LicensedTrack(_owner, _contract, _trackID,  LicenseType.Exclusive));
            emit LicenseBought();
        }

        else if (_licenseType == LicenseType.NonExclusive) {
            _price = seller.getNonExclusivePrice(_trackID);
            require(msg.value >= _price);
            (sent, ) = _owner.call{value: _price}("");
            require(sent, "Failed to send Ether (Non-exclusive Purchase).");
            licensedTracks.push(LicensedTrack(_owner, _contract, _trackID,  LicenseType.NonExclusive));
            emit LicenseBought();
        }

    }

    function getTrack(uint _trackID) external view returns(Track memory) {
        return idToTrack[_trackID];
    }

    function getTracks() public view returns(Track[] memory) {
        return tracks;
    }

    function getLicensedTracks() public view returns(LicensedTrack[] memory) {
        return licensedTracks;
    }

    

    
}