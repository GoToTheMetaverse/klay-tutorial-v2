const secret = require("./secret.js");
const CONTRACT = require("./build/contracts/CodingTutorialOpenSeaOwnable.json");
// const CONTRACT = require("./build/contracts-v1/CodingTutorialOpenSeaOwnable.json");

const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const networkID = "8217";
const ADDR = secret.addr_cypress;
const PKEY = secret.pkey_cypress;

const Caver = require("caver-js");
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(ADDR, PKEY);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);
const addr = acc.address;
console.log("addr", addr);

const deplyedNetworkAddress = CONTRACT.networks[networkID].address;
const contract = new caver.klay.Contract(CONTRACT.abi, deplyedNetworkAddress);
console.log("contract", deplyedNetworkAddress);

async function mint() {
  const uid = 2;
  await contract.methods
    .mint(uid, "https://mynft.gunillee.repl.co/res-v3/nft-" + uid + ".json")
    .send({
      from: addr,
      gas: "2000000",
    });
}
mint();
