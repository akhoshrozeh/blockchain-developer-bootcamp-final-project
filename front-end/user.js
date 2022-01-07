import producerBuild from './Producer.json' assert { type: "json" };;
import factoryBuild from './ProducerFactory.json' assert { type: "json" };;
const factoryAddress = "0xaaDb1F4521e940ae2853448A5bC4022d2b59d9DC";
const factoryABI = factoryBuild.abi;
const producerABI = producerBuild.abi;


web3 = new Web3(window.ethereum)

let factory = new web3.eth.Contract(factoryABI, factoryAddress);

let mmUserAddress;
let mmUserContractAddress;
let mmUserContract;

let searchAddress;
let searchContractAddress;
let searchContract;

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
searchAddress = params.contractOwner

document.getElementById("profile-but").addEventListener("click", gotoProfile);
document.getElementById("home-but").addEventListener("click", goHome);


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

function gotoProfile() {
  if(mmUserAddress !== null)
    location.replace('./user.html?contractOwner=' + mmUserAddress)
  else {
    alert("bad")
  }
}

function goHome() {
    location.replace('./index.html');
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

async function setupLicBuying() {
  if(mmUserAddress === null)
    mmUserAddress = ethereum.selectedAddress;
  
  mmUserContractAddress = await factory.methods.getOwnersContract(mmUserAddress).call();
  mmUserContract = new web3.eth.Contract(producerABI, mmUserContractAddress);
  console.log("mmUserCOntract: ", mmUserContract)
}

async function renderBuyExclButton() {
  const div = document.createElement("div");
  div.id = "buy-excl-div";
  const b = document.createElement("button");
  b.type = "button";
  b.id = "buy-excl-but";
  b.innerHTML = "Buy Exclusive License";
  div.appendChild(b);
  let ele = document.getElementById("contract-meta");
  ele.insertAdjacentElement('afterend', div);
  document.getElementById("buy-excl-but").addEventListener("click", buyExcluLic);
}

async function renderBuyNonExclButton() {
  const div = document.createElement("div");
  div.id = "buy-non-excl-div";
  const b = document.createElement("button");
  b.type = "button";
  b.id = "buy-non-excl-but";
  b.innerHTML = "Buy Non-Exclusive License";
  div.appendChild(b);
  let ele = document.getElementById("contract-meta");
  ele.insertAdjacentElement('afterend', div);
  document.getElementById("buy-non-excl-but").addEventListener("click", buyNonExcluLic);
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

function gotoCreateTrackPage() {
  console.log("going to create track page...")
  location.replace('./createTrack.html?contractOwner=' + searchAddress)
}

async function setExPrice() {
  let price = document.getElementById("price-input").value;
  if (!selectedTrack) {
    alert("Please select a track first.");
    return;
  }
  await searchContract.methods.setExclusivePrice(selectedTrack[0], (price)).send({from: ethereum.selectedAddress});
}

async function setNonExPrice() {
  let price = document.getElementById("price-input").value;
  if (!selectedTrack) {
    alert("Please select a track first.");
    return;
  }
  await searchContract.methods.setNonExclusivePrice(selectedTrack[0], (price)).send({from: ethereum.selectedAddress});
}

async function renderSetPriceButtons() {
  const div = document.createElement("div");
  div.id = "set-price-div";
  
  const form = document.createElement("form");
  form.id = "set-price-form";
  
  const bEx = document.createElement("button");
  bEx.id = "ex-button";
  bEx.type = "button";
  bEx.innerHTML = "Set Exclusive Price";
  
  const bNonEx = document.createElement("button");
  bNonEx.id = "non-ex-button";
  bNonEx.type = "button";
  bNonEx.innerHTML = "Set Non-Exclusive Price";
  
  const input = document.createElement("input");
  input.type = "text";
  input.id = "price-input";
  input.placeholder = "Track License Price";

  form.appendChild(input);
  form.appendChild(bEx);
  form.appendChild(bNonEx);
  div.appendChild(form);
  document.getElementById("create-track-div").insertAdjacentElement('afterend', div);
  document.getElementById("ex-button").addEventListener("click", setExPrice);
  document.getElementById("non-ex-button").addEventListener("click", setNonExPrice);
}

// TODO: Create div that tells which track is selected!

async function showTracks() {
  console.log("showing tracks...");
  let tracks = await searchContract.methods.getTracks().call();
  if(tracks.length === 0) return;

  let table;
  let i = 0;
  let tbody;
  for(let x of tracks) {

    if (i === 0) {
      table = document.createElement("table");
      table.id = "tracks-table"
      let tr = document.createElement("tr")
      
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      let th4 = document.createElement("th");
      let th5 = document.createElement("th");
      
      th1.innerHTML = "Track Name";
      th2.innerHTML = "IPFS CID";
      th3.innerHTML = "Track ID";
      th4.innerHTML = "Exclusive Price";
      th5.innerHTML = "Non-Exclusive Price";

      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);
      table.appendChild(tr);

      tbody = document.createElement("tbody");

    }
    
    const tr = document.createElement("tr");
    // tr.id = "tr" + String(i);
    // tr.onclick()
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    let exPrice = await searchContract.methods.getExclusivePrice(x.trackID).call();
    let nonExPrice = await searchContract.methods.getNonExclusivePrice(x.trackID).call();
    
    td1.innerHTML = x.name;
    td2.innerHTML = x.CID;
    td3.innerHTML = x.trackID;
    td4.innerHTML = exPrice;
    td5.innerHTML = nonExPrice;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    // tr.addEventListener("click", buyLicense.bind(null, [searchAddress, searchContractAddress, x.trackID, ]))
    tr.addEventListener("click", selectTrack.bind(null, [x.trackID]))
    tbody.appendChild(tr);

    i++;
  }

  table.appendChild(tbody);
  let ele = document.getElementById("tracks")
  ele.appendChild(table);
}



async function showLicTracks() {
  console.log("showing licensed tracks...");
  let licTracks = await searchContract.methods.getLicensedTracks().call();
  if(licTracks.length === 0) return;

  let table;
  let i = 0;
  let tbody;
  for(let x of licTracks) {

    if (i === 0) {
      table = document.createElement("table");
      table.id = "tracks-table"
      let tr = document.createElement("tr")
      
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");

      
      th1.innerHTML = "Track Owner";
      th2.innerHTML = "Track ID";
      th3.innerHTML = "License Type";

      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      table.appendChild(tr);

      tbody = document.createElement("tbody");

    }
    
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");


    
    td1.innerHTML = x.owner;
    td2.innerHTML = x.trackID;
    if (x.license == 0) 
      td3.innerHTML = "Exclusive";
    else
      td3.innerHTML = "Non-Exclusive";


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbody.appendChild(tr);

    i++;
  }

  table.appendChild(tbody);
  let ele = document.getElementById("lic-tracks")
  ele.appendChild(table);
  
}


function selectTrack(_trackID) {
  if(_trackID !== selectedTrack) {
    console.log("new track is ", _trackID)
  }
  selectedTrack = _trackID;
  document.getElementById("selected-track-display").innerHTML = "Selected Track: " + selectedTrack;
  return selectedTrack;
}


async function buyExcluLic() {
  try {
    if (selectedTrack === null) {
      console.log("null track. can't buy");
      return;
    } 
    console.log(searchAddress, searchContractAddress, (selectedTrack[0]), 0)
    let price = await searchContract.methods.getExclusivePrice((selectedTrack[0])).call(); 
    console.log("PRICE: " , price)
    
    await mmUserContract.methods.buyLicense(searchAddress, searchContractAddress, (selectedTrack[0]), 0).send({from: ethereum.selectedAddress, value:price});

  }
  catch(e) {
    console.log("Couldn't buy exclusive license for this track ID: " + selectedTrack + ". Error: ");
    console.log(e);
  }
}

async function buyNonExcluLic() {
  try {
    if (selectedTrack === null) {
      console.log("null track. can't buy");
      return;
    } 
    console.log(searchAddress, searchContractAddress, (selectedTrack[0]), 0)
    let price = await searchContract.methods.getNonExclusivePrice((selectedTrack[0])).call(); 
    console.log("PRICE: " , price)
    
    await mmUserContract.methods.buyLicense(searchAddress, searchContractAddress, (selectedTrack[0]), 1).send({from: ethereum.selectedAddress, value:price});

  }
  catch(e) {
    console.log("Couldn't buy exclusive license for this track ID: " + selectedTrack + ". Error: ");
    console.log(e);
  }
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
        await renderSetPriceButtons();
        
    }
    

    // user looking at another account's page
    else {
        console.log("not owner")
        let accExists = await factory.methods.producerExists(mmUserAddress).call();
        if(accExists === true) {
          await setupLicBuying();
          await renderBuyExclButton();
          await renderBuyNonExclButton();
        }
        
    }

}


// Execution
render()




