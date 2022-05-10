// const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
// const networkID = "8217";
const rpcURL = "https://api.baobab.klaytn.net:8651/";
const networkID = "1001";

const Caver = require("caver-js");
const caver = new Caver(rpcURL);

const CONTRACT_ABI = require("./abi/MyGame.json");
const contract_addr = CONTRACT_ABI.networks[networkID].address;
const contract = new caver.klay.Contract(CONTRACT_ABI.abi, contract_addr);
console.log("contract_addr", contract_addr);
console.log("가위바위보 주소: https://klaytngame-1.gunillee.repl.co/");

let ret;
let busy = false;
let call_count = 0;
let last_block_id = 90628000;
let depth = 99;

async function read_event() {
  if (busy) {
    console.log("read_event busy");
    return;
  }

  busy = true;
  call_count++;

  try {
    const bn = await caver.klay.getBlockNumber();

    const fromBlock = last_block_id + 1;
    const toBlock = last_block_id + depth;
    if (toBlock > bn) {
      console.log("bn not yet", toBlock - bn);
      busy = false;
      return;
    }

    ret = await contract.getPastEvents("play_log", {
      filter: {},
      fromBlock,
      toBlock,
    });

    console.log("play_log ret", fromBlock, ret.length);
    for (let i = 0; i < ret.length; i++) {
      let e = ret[i];
      console.log(i, e.blockNumber, e.returnValues);
    }

    last_block_id = toBlock;
  } catch (e) {
    console.log("read_event fail", e);
  }

  busy = false;
}

setInterval(read_event, 1000 * 10);
