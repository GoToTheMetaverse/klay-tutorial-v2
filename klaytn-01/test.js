let pkey = "0x0000000000000000000000000000000000000000000000000000000000000001";
let addr = "0x7e5f4552091a69125d5dfcb7b8c2659029395bdf";

const Caver = require("caver-js");
const rpcURL = "https://api.baobab.klaytn.net:8651/";
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);

async function test() {
  let peb = await caver.klay.getBalance(addr);
  let klay = caver.utils.fromPeb(peb, "KLAY");
  console.log("peb", peb);
  console.log("klay", klay);
}
test();
