const secret = require("./secret.js");
const CONTRACT = require("./build/contracts/MyNFT.json");

const rpcURL = "https://api.baobab.klaytn.net:8651";
const networkID = "1001";
const ADDR = secret.addr;
const PKEY = secret.pkey;

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

async function test() {
  let ret;

  ret = await caver.klay.getBalance(addr);
  console.log("getBalance", ret);
  ret = await contract.methods.totalSupply().call();
  console.log("totalSupply", ret);
  ret = await contract.methods.balanceOf(addr).call();
  console.log("mynft balance", ret);

  ret = await contract.methods.getData().call();
  const fee = ret.fee;
  const count = ret.count;
  console.log("fee", fee);
  console.log("count", count);

  // await contract.methods.mintGeust().send({
  //   from: addr,
  //   gas: "20000000",
  //   value: fee,
  // });

  // await contract.methods.setCount(3).send({
  //   from: addr,
  //   gas: "20000000",
  // });
}
test();
