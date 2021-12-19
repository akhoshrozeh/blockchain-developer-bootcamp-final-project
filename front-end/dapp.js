let walletDetected = false;
let userAddress;
let userContractAddress;
let walletConnected = false;

// this is the address in ganache
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

// Detect metamask is/is not install
window.addEventListener("load", function() {
    if (typeof window.ethereum !==  'undefined') {
        walletDetected = true;
        console.log("MetaMask is installed. Sweet!");
        let wallDetect = this.document.getElementById('mm-detection');
        wallDetect.innerHTML += "MetaMask has been detected!"
    }
    else {
        let wallDetect = this.document.getElementById('mm-detection');
        wallDetect.innerHTML += "MetaMask was not detected. Please install MetaMask to use this dApp."
        console.log('MetaMask not available.');
        this.alert("Please install MetaMask to use this dApp!");
    }
});

// web3 instance
web3 = new Web3(window.ethereum)

// create the producer factory contract instance
let factory = new web3.eth.Contract(factoryABI, factoryAddress);
let prodExists;
let clickCount = 0;
// allow the user to get access to MetaMask
const mmCxn = document.getElementById('mm-cxn-button');
mmCxn.onclick = async () => { 
    await ethereum.request({ method: 'eth_requestAccounts'});
    const mmCurrAcc = document.getElementById('mm-curr-acc');
    userAddress = ethereum.selectedAddress;
    mmCurrAcc.innerHTML = "Here's your current account: <strong><i>" + userAddress + "</strong></i>";
    walletConnected = true;

    // check if current account has a Producer contract
    prodExists = await factory.methods.producerExists(userAddress).call();

    if (clickCount !== 0) {
        return;
    }
    // To do 
    if (prodExists === true) {
        console.log("Producer exists..");
        userContractAddress = await factory.methods.getOwnersContract(userAddress).call();
        document.getElementById("mm-detection").remove();
        document.getElementById("mm-cxn-button").remove();
        
        const div = document.createElement("div");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");


        const t1 = document.createTextNode("Producer contract associated with Ethereum address found!");
        const t2 = document.createTextNode("Redirecting to your user page in 3 seconds...");
        p1.appendChild(t1);
        // p1.appendChild(br);
        p2.appendChild(t2);
        div.appendChild(p1);
        div.appendChild(p2);
        let ele = document.getElementById("home");
        ele.appendChild(div);
        await sleep(3000);
        location.replace('./user.html?contractOwner=' + userAddress)
        // location.replace('./user.html?contractOwner=' + userContractAddress)

    }

    // let user create 
    else {
        console.log("producer doesn't exist");
        displayNotRegisteredMessage();
        displayRegistration();
    }
    clickCount++;
};

// deploy ProducerFactory
function displayNotRegisteredMessage() {
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    
    const t1 = document.createTextNode("This Ethereum account doesn't have a Producer contract registered to it!\n");
    const t2 = document.createTextNode("Please enter a Producer name and click 'Register'.");
    p1.appendChild(t1);
    p2.appendChild(t2);
    div.appendChild(p1);
    div.appendChild(p2);
    let ele = document.getElementById("home");
    ele.appendChild(div);
}

async function createProducer() {
    console.log("Producer created!")
    const producerName  = document.getElementById("prod-name").value;
    console.log("Here's your name:", producerName);
    await factory.methods.createProducer(producerName).send({from:userAddress});
    userContractAddress = await factory.methods.getOwnersContract(userAddress).call();
    console.log(userContractAddress);
}

function displayRegistration() {
    const form1 = document.createElement("form");
    let input1 = document.createElement("input")
    input1.type = "text";
    input1.name = "prod-name";
    input1.id = "prod-name";
    let but1 = document.createElement("button");
    but1.type = "button"
    but1.id = "reg-but";
    but1.onclick="createProducer()";
    but1.innerHTML = "Register"
    form1.appendChild(input1);
    form1.appendChild(but1);
    let ele = document.getElementById("home");
    ele.appendChild(form1);
    document.getElementById("reg-but").addEventListener("click", createProducer)
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// allow the user to send a txn/update contract state (i.e. send a txn to a contract)
