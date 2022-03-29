const secret = require("./secret.js");
const CONTRACT = require("./build/contracts/MyNFT.json");

const rpcURL = "https://api.baobab.klaytn.net:8651";
const networkID = "1001";

// const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
// const networkID = "8217";

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
  console.log("my getBalance", ret);
  ret = await caver.klay.getBalance(deplyedNetworkAddress);
  const c_balance = ret;
  console.log("contract getBalance", ret);
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

  // await contract.methods.setCount(10).send({
  //   from: addr,
  //   gas: "20000000",
  // });

  // await contract.methods.withdraw(c_balance).send({
  //   from: addr,
  //   gas: "20000000",
  // });
}
test();
