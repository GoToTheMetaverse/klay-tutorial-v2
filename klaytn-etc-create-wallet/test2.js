let pkey = "0x";
for (let i = 0; i < 64; i++) {
  let n = Math.floor(Math.random() * 16);
  pkey += n.toString(16);
}
console.log("pkey", pkey);

const privateKeyToAddress = require("ethereum-private-key-to-address");
const addr = privateKeyToAddress(pkey);
console.log("addr", addr);
