const factoryAddress = "0x47D49485B0A4eE6448F1D0511021184BFF3784bB";
const factoryABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ProducerCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "prodAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "createProducer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProducers",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_prodAddr",
          "type": "address"
        }
      ],
      "name": "getProducer",
      "outputs": [
        {
          "internalType": "contract Producer",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_producer",
          "type": "address"
        }
      ],
      "name": "producerExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getOwnersContract",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
const producerABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_prodName",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "m",
          "type": "string"
        }
      ],
      "name": "Fallback",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "LicenseBought",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tracks",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "CID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "trackID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "trackOwner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [],
      "name": "getName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "setExclusivePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "setNonExclusivePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackID",
          "type": "uint256"
        }
      ],
      "name": "getExclusivePrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackID",
          "type": "uint256"
        }
      ],
      "name": "getNonExclusivePrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_CID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_excluPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_nonExcluPrice",
          "type": "uint256"
        }
      ],
      "name": "createTrack",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_trackID",
          "type": "uint256"
        },
        {
          "internalType": "enum Producer.LicenseType",
          "name": "_licenseType",
          "type": "uint8"
        }
      ],
      "name": "buyLicense",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackID",
          "type": "uint256"
        }
      ],
      "name": "getTrack",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "CID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "trackID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "trackOwner",
              "type": "address"
            }
          ],
          "internalType": "struct Producer.Track",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTracks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "CID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "trackID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "trackOwner",
              "type": "address"
            }
          ],
          "internalType": "struct Producer.Track[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLicensedTracks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "owningContract",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "trackID",
              "type": "uint256"
            },
            {
              "internalType": "enum Producer.LicenseType",
              "name": "license",
              "type": "uint8"
            }
          ],
          "internalType": "struct Producer.LicensedTrack[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
// let isPageOwner = (ethereum.selectedAddress === )

  web3 = new Web3(window.ethereum)

let factory = new web3.eth.Contract(factoryABI, factoryAddress);

let mmUserAddress;
let searchAddress;
let searchContractAddress;
let searchContract;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
searchAddress = params.contractOwner



let selectedTrack = null;
let selectedLicensedTrack = null;

async function showAddresses() {
  try {
    let prodExists = await factory.methods.producerExists(searchAddress).call();
    if (!prodExists) {
      alert("Account doesn't exist. Make sure this Ethereum address has a BlockBeats account.");
    }
    else {
        searchContractAddress = await factory.methods.getOwnersContract(searchAddress).call();
        document.getElementById("contract-meta").innerHTML = "Contract Owner: " + searchAddress + "<br>";
        document.getElementById("contract-meta").innerHTML += "Contract Address: " + searchContractAddress;
        
    }
  }
  catch(e) {
    alert("Please enter a valid Ethereum address in the URL as such: `user.html?contractOwner={validEOA}`")
    return -1;
  }
}

async function createContract() {
    try {

        searchContract = new web3.eth.Contract(producerABI, searchContractAddress);
    }
    catch(e) {
        alert("You've entered an invalid contract address! Try again.")
    }
}

async function isOwner() {
    await ethereum.request({method: 'eth_requestAccounts'});
    mmUserAddress = ethereum.selectedAddress;

    if (mmUserAddress === searchAddress) 
      return true;
    else 
      return false;
}

async function renderCreateTrackButton() {
  const div = document.createElement("div");
  div.id = "create-track-div"
  const b = document.createElement("button");
  b.type = "button";
  b.id = "create-track-but";
  b.onclick="gotoCreateTrackPage()";
  b.innerHTML = "Create Track";
  div.appendChild(b);
  let ele = document.getElementById("contract-meta");
  ele.insertAdjacentElement('afterend', div);
  document.getElementById("create-track-but").addEventListener("click", gotoCreateTrackPage)
}

// TODO: Implement the location.replace function
// TODO: need to create that .html and .js files for that page
function gotoCreateTrackPage() {
  console.log("going to create track page...")
  location.replace('./createTrack.html?contractOwner=' + searchAddress)
}

async function showTracks() {

}

async function showLicTracks() {

}



async function render() {
    let r = await showAddresses();
    if(r === -1) return;
    let isOwnerBool = await isOwner();
    await createContract();
    console.log(searchContract.methods)
    await showTracks();
    await showLicTracks();
    

    // user looking at own page  
    if (isOwnerBool === true) {
        console.log("is owner")
        await renderCreateTrackButton();
    }

    // user looking at another account's page
    else {
        console.log("not owner")
    }

}

render()




