const { pkey, addr } = require("./secret.js");
const CONTRACT = require("./build/contracts/MyContract.json");

const Caver = require("caver-js");
const rpcURL = "https://api.baobab.klaytn.net:8651/";
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);

const networkID = "1001";
const deplyedNetworkAddress = CONTRACT.networks[networkID].address;
const contract = new caver.klay.Contract(CONTRACT.abi, deplyedNetworkAddress);

async function test() {
  let peb;
  let ret;
  for (let i = 1; i < 10; i++) {
    peb = await caver.klay.getBalance(addr);
    ret = await contract.methods.get_myval().call();
    console.log("before", ret, peb);

    let next = Number(ret) + 1;
    await contract.methods.set_myval(next).send({
      from: addr,
      gas: "2000000",
    });

    ret = await contract.methods.get_myval().call();
    console.log("after", ret);
  }
}
test();
