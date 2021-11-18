let walletDetected = false;
let userAddress;

// Detect metamask is/is not install
window.addEventListener("load", function() {
    if (typeof window.ethereum !==  'undefined') {
        walletDetected = true;
        console.log("MetaMask is installed. Sweet!");
        let wallDetect = this.document.getElementById('mm-detection');
        wallDetect.innerHTML += "MetaMask has been detected."
    }
    else {
        console.log('MetaMask not available.');
        this.alert("Please install MetaMask to use this dApp!");
    }
});


// allow the user to get access to MetaMask
const mmCxn = document.getElementById('mm-cxn-button');
mmCxn.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts'});
    const mmCurrAcc = document.getElementById('mm-curr-acc');
    userAddress = ethereum.selectedAddress;
    mmCurrAcc.innerHTML = "Here's your current account: " + userAddress;
};


// allow the user to send a txn/update contract state (i.e. send a txn to a contract)