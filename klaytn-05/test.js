const { pkey, addr } = require("../secret.js");

const CONTRACT = require("./build/contracts/MyGame.json");

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

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function test() {
  let peb;
  let ret;

  peb = await caver.klay.getBalance(addr);
  console.log("before peb", peb);
  ret = await contract.methods.get_balance().call();
  console.log("get_balance", ret);
  ret = await contract.methods.get_bet_size().call();
  console.log("get_bet_size", ret);

  // let block = 84483991;
  // // game_id: [13],
  // fromBlock: 84483991,
  // toBlock: 84483991 + 1000,

  ret = await contract.getPastEvents("play_log", {
    filter: {},
    fromBlock: 84484991,
    toBlock: "latest",
  });
  console.log("getPastEvents", ret);

  // ret = await contract.getPastEvents("play_log", {});
  // console.log("getPastEvents", ret);

  // let size = caver.utils.toPeb("0.1", "KLAY");
  // console.log("size", size);
  // 0.1 klay = "100000000000000000"

  // 배팅액 수정
  await contract.methods.set_bet_size("100000000000000000").send({
    from: addr,
    gas: "2000000",
  });

  // // 플레이 게임
  // let ret_bet_size = await contract.methods.get_bet_size().call();
  // ret = await contract.methods.play_game(0).send({
  //   from: addr,
  //   value: ret_bet_size,
  //   gas: "2000000",
  // });
  // console.log("ret.events.play_log", ret.events);

  // // 입금
  // size = caver.utils.toPeb("1.0", "KLAY");
  // await contract.methods.deposit().send({
  //   from: addr,
  //   value: size,
  //   gas: "2000000",
  // });

  // // 출금
  // size = caver.utils.toPeb("1.0", "KLAY");
  // await contract.methods.withdraw(size).send({
  //   from: addr,
  //   gas: "2000000",
  // });
}
test();

/*

play_game {
  blockHash: '0x774418681fdc6e23b43d7a838f7eb3a4f1bd25760035e9da072366c689dc256d',        
  blockNumber: 84395544,
  contractAddress: null,
  from: '0x846cf252896a5597ea8b6eb902dbc0c3eb35c637',
  gas: '0x1e8480',
  gasPrice: '0x5d21dba00',
  gasUsed: 57947,
  input: '0x72a173aa0000000000000000000000000000000000000000000000000000000000000000',    
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000040000000000000000020000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000008000000000000000008000000000200000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x8',
  senderTxHash: '0xa2f48dbbe71b1d89831cadd2d659c0fa2fbfad9dd3592d3513df77a17c40fcc9',     
  signatures: [
    {
      V: '0x7f6',
      R: '0xd44fc6d2c5824dc0acfac6e6c9bc33c78137661fc14a2055f51634182a73d29a',
      S: '0x2d89a14a356b6998b83a2f2c6b2b11eabeba939cff78a88c96446cfdc6f3c766'
    }
  ],
  status: true,
  to: '0x65915cdf7d7598849189982663684e3c077c41b4',
  transactionHash: '0xa2f48dbbe71b1d89831cadd2d659c0fa2fbfad9dd3592d3513df77a17c40fcc9',  
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x16345785d8a0000',
  events: {
    play_log: {
      address: '0x65915cdf7d7598849189982663684e3c077c41b4',
      blockNumber: 84395544,
      transactionHash: '0xa2f48dbbe71b1d89831cadd2d659c0fa2fbfad9dd3592d3513df77a17c40fcc9',
      transactionIndex: 0,
      blockHash: '0x774418681fdc6e23b43d7a838f7eb3a4f1bd25760035e9da072366c689dc256d',    
      logIndex: 0,
      id: 'log_8413fe51',
      returnValues: [Result],
      event: 'play_log',
      signature: '0xb0996af45074629f2af5d9115842b7c45ba9f1c990924043c9094380e3a2bd83',    
      raw: [Object]
    }
  }
}

ret.events.play_log {
  address: '0x65915cdf7d7598849189982663684e3c077c41b4',
  blockNumber: 84395674,
  transactionHash: '0xc06f9b4357f6d508610d8e01ba46ca4e4b0bcf4c4a0305f5680e218716e75f95',  
  transactionIndex: 0,
  blockHash: '0x3878f4748f713f194a7d7f0d8aa1bc0fc0cfc6acf6b55c4847d13bd4fab9cefd',        
  logIndex: 0,
  id: 'log_658ee61f',
  returnValues: Result {
    '0': '2',
    '1': '0x846cf252896A5597eA8B6eB902dBC0C3EB35C637',
    '2': '0',
    '3': '1',
    '4': '0',
    game_id: '2',
    adr: '0x846cf252896A5597eA8B6eB902dBC0C3EB35C637',
    input: '0',
    server_input: '1',
    result: '0'
  },
  event: 'play_log',
  signature: '0xb0996af45074629f2af5d9115842b7c45ba9f1c990924043c9094380e3a2bd83',        
  raw: {
    data: '0x000000000000000000000000846cf252896a5597ea8b6eb902dbc0c3eb35c637000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000',
    topics: [
      '0xb0996af45074629f2af5d9115842b7c45ba9f1c990924043c9094380e3a2bd83',
      '0x0000000000000000000000000000000000000000000000000000000000000002'
    ]
  }
}

*/
