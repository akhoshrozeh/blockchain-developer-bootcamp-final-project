import producerBuild from './Producer.json' assert { type: "json" };;
import factoryBuild from './ProducerFactory.json' assert { type: "json" };;
const factoryAddress = "0xD1C06259B9f78fa5aA7fd6dc6Cc2f8A10AFD79f2";
const factoryABI = factoryBuild.abi;
const producerABI = producerBuild.abi;

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
        let frm = document.getElementById("track-form");
        frm.reset();
        alert("Success!")

    }
    catch(e) {
        console.log(e);
    }

}
