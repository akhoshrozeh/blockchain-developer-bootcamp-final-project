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

web3 = new Web3(window.ethereum)

let factory = new web3.eth.Contract(factoryABI, factoryAddress);

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let searchAddress = params.contractOwner


document.getElementById("create-but").addEventListener("click", createTrack)
document.getElementById("user-but").addEventListener("click", gotoUserPage);

function gotoUserPage() {
    location.replace('./user.html?contractOwner=' + searchAddress)
}

function getTrackInfo() {
    let name = document.getElementById("name").value
    let cid = document.getElementById("cid").value
    let excluPrice = document.getElementById("exclu-price").value
    let nonexluPrice = document.getElementById("non-exclu-price").value
    const trackInfo = [name, cid, excluPrice, nonexluPrice]
    return trackInfo;
}

async function createTrack() {
    const trackInfo = getTrackInfo();
    console.log(trackInfo)
    try {
        console.log(searchAddress)
        let searchContractAddress = await factory.methods.getOwnersContract(searchAddress).call();
        console.log(searchContractAddress);
        let ownerContract = new web3.eth.Contract(producerABI, searchContractAddress);
        await ownerContract.methods.createTrack(trackInfo[0], trackInfo[1], trackInfo[2], trackInfo[3]).send({from: ethereum.selectedAddress});

    }
    catch(e) {
        console.log(e);
    }

}
