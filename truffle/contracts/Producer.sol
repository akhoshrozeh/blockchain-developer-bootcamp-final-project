pragma solidity >=0.5.16 <0.9.0;
pragma experimental ABIEncoderV2;

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
    mapping (address => mapping(uint => bool)) private hasExclusiveLicenseMap;
    mapping (address => mapping(uint => bool)) private hasNonExclusiveLicenseMap;
    

    enum LicenseType {Exclusive, NonExclusive}

    event Fallback(string m);

    struct Track {
        string name;
        string CID;
        uint trackID;
        address trackOwner;
    }

    
    struct LicensedTrack {
        address owner;
        uint trackID;
        LicenseType license;
    }

    // fallback() external payable {
    //     // emit Fallback("fallback called");
    // }

    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier hasValidFunds(uint _price) {
        require(msg.value >= _price);
        _;
    }
    
    
    constructor(string memory _prodName, address payable _owner) public {
        idCounter = 0;
        prodName = _prodName;
        owner = _owner;

    }
    function setExclusivePrice(uint _trackID, uint _price) private isOwner {
        excluPrice[_trackID] = _price;
    }
    function setNonExclusivePrice(uint _trackID, uint _price) private isOwner {
        nonExcluPrice[_trackID] = _price;
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
    function buyLicense(address payable _owner, uint _trackID, LicenseType _licenseType) public payable returns(string memory) {
        if (_licenseType == LicenseType.Exclusive) {
            require(msg.value >= excluPrice[_trackID]);
            // pay the producer
            // (bool sent, bytes memory data) = _owner.call{value: excluPrice[_trackID]}("");
            // require(sent, "Failed to send Ether");
            _owner.transfer(excluPrice[_trackID]);

            // add track to licensedTracks
            
            // LicensedTrack memory lt = (_owner, _trackID, LicenseType.Exclusive);
            licensedTracks.push(LicensedTrack(_owner, _trackID, LicenseType.Exclusive));
        }

        else if (_licenseType == LicenseType.NonExclusive) {
            require(msg.value >= nonExcluPrice[_trackID]);
            // (bool sent, bytes memory data) = _owner.call{value: nonExcluPrice[_trackID]}("");
            // require(sent, "Failed to send Ether");
            _owner.transfer(nonExcluPrice[_trackID]);

            // LicensedTrack memory lt = (_owner, _trackID, LicenseType.NonExclusive);
            licensedTracks.push(LicensedTrack(_owner, _trackID, LicenseType.NonExclusive));
        }

        else {
            return "Invalid purchase. Check funds or LicenseType.";
        }

        return idToTrack[_trackID].CID;
    }

    // function exclusiveLicenseSold(uint _trackID) private {
    //     hasExclusiveLicense[msg.sender][_trackID] = true;
    //     licensedProducers[_trackID].push(msg.sender);
    // }

    // function nonExclusiveLicenseSold(uint _trackID) private {
    //     hasNonExclusiveLicense[msg.sender][_trackID] = true;
    //     licensedProducers[_trackID].push(msg.sender);
    // }


    function getTrack(uint _trackID) external view returns(Track memory) {
        return idToTrack[_trackID];
    }

    function getTracks() public view returns(Track[] memory) {
        return tracks;
    }

    function getLicensedTracks() public view returns(LicensedTrack[] memory) {
        return licensedTracks;
    }

    // function sellLicense(){}
    // function hasExclusiveLicense(address _holder, uint _trackID) public {
    //     return hasExclusiveLicenseMap[_holder][_trackID];
    // }
    // function hasNonExclusiveLicense(address _holder, uint _trackID) public {
    //     return hasExclusiveLicenseMap[_holder][_trackID];
    // }

    

    
}