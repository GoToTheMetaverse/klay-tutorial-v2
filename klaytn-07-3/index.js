const express = require("express");
const bodyParser = require("body-parser");
const { port } = require("./config");
const Caver = require("caver-js");

const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const networkID = "8217";
const caver = new Caver(rpcURL);

const CONTRACT_ADDR = "0x970fd3b0e9d52f89c86ee6995e554258f77913b5";
let contract = null;

// const WALLET_ADDR = "0x941a7a3a0b9b63d23d245e55cefc593ae0a63290";
async function initContract() {
  contract = await caver.kct.kip17.create(CONTRACT_ADDR);
  console.log("initContract ok");
  // let ret;
  // ret = await contract.totalSupply();
  // console.log("totalSupply", ret);
  // ret = await contract.balanceOf(WALLET_ADDR);
  // console.log("balanceOf", ret);
}
initContract();

// CTBOT 토큰
// OTYzMzM4NTkyNDg5NDcyMDEw.YlUo-g.HR5iRbPPAmcTnNBpycLb6grr75Q
// 열활 - 가입자권한: 965911754259443712
// 채널 - 권한부여방: 965914394968076328
//
// 초대링크
// https://discord.gg/SxK7h9qvSx
// rediect url
// http://localhost:53134
// https://discord.com/api/oauth2/authorize?client_id=963338592489472010&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=identify

const app = express();

app.use(bodyParser.json());

app.get("/", (request, response) => {
  return response.sendFile("index.html", { root: "." });
});

app.post("/api_discord_connect", async (request, response) => {
  console.log("api_discord_connect", request.body);

  // 디스코드봇이 유저에게 권한을 준다.

  return response.json({
    code: 200,
    message: "ok",
  });
});

app.post("/api_wallet", async (request, response) => {
  console.log("api_wallet", request.body);
  const addr = request.body.addr;
  let ret;
  ret = await contract.balanceOf(addr);
  const count = Number(ret);
  console.log("count", count);

  return response.json({
    code: 200,
    message: "ok",
    count,
  });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
