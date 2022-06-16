const Caver = require("caver-js");
const caver = new Caver("");

const acc = caver.klay.accounts.create("aaaa@gmail.com");
console.log("addr", acc.address);
console.log("pkey", acc.privateKey);

// addr 0x6d12d5C84Ea9eDe73b8e826E2ad9C49B50E621b3
// pkey 0xa56a56b7219079511cc0472e3f5244987d07e38941728b9ade31bfca7eff446c
