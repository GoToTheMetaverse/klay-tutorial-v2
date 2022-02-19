const secret = require("./secret.js");

const CONTRACT = require("./build/contracts/CodingTutorialOpenSeaAbout.json");
const Caver = require("caver-js");

// const rpcURL = "https://api.baobab.klaytn.net:8651";
// const networkID = "1001";
// const ADDR = secret.addr;
// const PKEY = secret.pkey;

const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const networkID = "8217";
const ADDR = secret.addr_cypress;
const PKEY = secret.pkey_cypress;

const caver = new Caver(rpcURL);

let addr;
{
  const temp = caver.klay.accounts.createWithAccountKey(ADDR, PKEY);
  caver.klay.accounts.wallet.add(temp);

  const acc = caver.klay.accounts.wallet.getAccount(0);
  addr = acc.address;
}
console.log("addr", addr);

const deplyedNetworkAddress = CONTRACT.networks[networkID].address;
const contract = new caver.klay.Contract(CONTRACT.abi, deplyedNetworkAddress);
console.log("contract", deplyedNetworkAddress);

async function test() {
  let peb;
  let ret;

  ret = await contract.methods.tokenURI(1).call();
  console.log("tokenURI", ret);

  //민팅하기
  // const link = "https://mynft.gunillee.repl.co/res-v3/1.json";
  // await contract.methods.mint(1, link).send({
  //   from: addr,
  //   gas: "2000000",
  // });

  console.log("end");
}
test();
