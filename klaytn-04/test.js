const { pkey, addr } = require("./secret.js");

const CONTRACT = require("./build/contracts/MyContract.json");

const rpcURL = "https://api.baobab.klaytn.net:8651/";
const networkID = "1001";

const Caver = require("caver-js");
const caver = new Caver(rpcURL);

let temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
caver.klay.accounts.wallet.getAccount(0);

const deplyedNetworkAddress = CONTRACT.networks[networkID].address;
const contract = new caver.klay.Contract(CONTRACT.abi, deplyedNetworkAddress);
console.log("contract address", deplyedNetworkAddress);

async function test() {
  let peb;
  let ret;

  peb = await caver.klay.getBalance(addr);
  console.log("before peb", peb);
  ret = await contract.methods.get_balance().call();
  console.log("get_balance", ret);

  let size = caver.utils.toPeb("0.1", "KLAY");

  // await contract.methods.deposit().send({
  //   from: addr,
  //   value: size,
  //   gas: "2000000",
  // });

  // size = caver.utils.toPeb("0.01", "KLAY");
  size = "90000000000000000";
  await contract.methods.withdraw(size).send({
    from: addr,
    gas: "2000000",
  });

  ret = await caver.klay.getBalance(addr);
  console.log("after peb", ret);
  ret = await contract.methods.get_balance().call();
  console.log("after get_balance", ret);
}
test();
