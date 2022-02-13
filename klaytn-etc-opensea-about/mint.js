const { pkey, addr } = require("./secret.js");
const CONTRACT = require("./build/contracts/CodingTutorialOpenSeaAbout.json");

const Caver = require("caver-js");
const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);

const networkID = "8217";
const deplyedNetworkAddress = CONTRACT.networks[networkID].address;
const contract = new caver.klay.Contract(CONTRACT.abi, deplyedNetworkAddress);

async function mint() {
  const tx = await contract.methods
    .mint(1, "https://mynft.gunillee.repl.co/res-v3/nft-1.json")
    .send({
      from: addr,
      gas: "2000000",
    });
  console.log("tx", JSON.stringify(tx));
}
mint();

/*
tx {
  blockHash: '0x6b3edf6b2fec3209ae364ec6688ae89f3ec7329c7c719c45bcbe35b87c736417',
  blockNumber: 82881626,
  contractAddress: null,
  from: '0x941a7a3a0b9b63d23d245e55cefc593ae0a63290',
  gas: '0x1e8480',
  gasPrice: '0x5d21dba00',
  gasUsed: 234476,
  input: '0x77097fc800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000003068747470733a2f2f6d796e66742e67756e696c6c65652e7265706c2e636f2f7265732d76332f6e66742d312e6a736f6e00000000000000000000000000000000',
  logsBloom: '0x00000000000000100000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000002000000000000000000200000000000000000000000000008000060000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x1b',
  senderTxHash: '0x6dad4bad5d0b8656e0d8f909c04382c27e29010f2500034f0dc926748e8f8ed4',
  signatures: [
    {
      R: '0x2dbb859f8bdcc62bc4ebb18ce0add2b936ede1e8b505b345b00c8bdf21f76f11',
      S: '0x3a3a2527e900eeac5c303d3bf712c9b08e40d1d0defa2ba7289dd6a1aec2f95d',
      V: '0x4056'
    }
  ],
  status: true,
  to: '0x994be0f6ca013168dd974a39d203bf90651b4e58',
  transactionHash: '0x6dad4bad5d0b8656e0d8f909c04382c27e29010f2500034f0dc926748e8f8ed4',
  transactionIndex: 19,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {
    Transfer: {
      address: '0x994bE0f6Ca013168DD974a39D203bf90651b4E58',
      blockHash: '0x6b3edf6b2fec3209ae364ec6688ae89f3ec7329c7c719c45bcbe35b87c736417',
      blockNumber: 82881626,
      logIndex: 46,
      transactionHash: '0x6dad4bad5d0b8656e0d8f909c04382c27e29010f2500034f0dc926748e8f8ed4',
      transactionIndex: 19,
      id: 'log_fe0b916b',
      returnValues: [Result],
      event: 'Transfer',
      signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      raw: [Object]
    }
  }
}
*/
