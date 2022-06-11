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
  const total = Number(ret);
  console.log("totalSupply", ret);
  ret = await contract.methods.balanceOf(addr).call();
  console.log("mynft balance", ret);

  if (total > 0) {
    ret = await contract.methods.tokenURI(1).call();
    console.log("tokenUri", ret);
  } else {
    console.log("tokenUri skip");
  }

  ret = await contract.methods.getData().call();
  const fee = ret.fee;
  const count = ret.count;
  console.log("fee", fee);
  const left_mint_count = count - total;
  console.log("남은 민팅 가능 수량", left_mint_count);

  // // 밍팅하기, 민팅가능 수량이 있어야 민팅할 수 있음
  // if (left_mint_count > 0) {
  //   console.log("try mintGeust");
  //   ret = await contract.methods.mintGeust().send({
  //     from: addr,
  //     gas: "20000000",
  //     value: fee,
  //   });
  //   console.log("result mintGeust", ret.events);
  // }

  // // 민팅 가능한 수량 설정
  // await contract.methods.setCount(10).send({
  //   from: addr,
  //   gas: "20000000",
  // });

  // // 출급하기
  // await contract.methods.withdraw(c_balance).send({
  //   from: addr,
  //   gas: "20000000",
  // });
}
test();
