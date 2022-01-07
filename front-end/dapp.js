let walletDetected = false;
let userAddress;
let userContractAddress;
let walletConnected = false;

import producerBuild from './Producer.json' assert { type: "json" };;
import factoryBuild from './ProducerFactory.json' assert { type: "json" };;
const factoryAddress = "0xaaDb1F4521e940ae2853448A5bC4022d2b59d9DC";
const factoryABI = factoryBuild.abi;
const producerABI = producerBuild.abi;

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
    location.replace('./user.html?contractOwner=' + userAddress)
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
