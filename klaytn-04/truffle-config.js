const {
  //
  pkey,
  pkey_cypress,
  kas_project_auth,
} = require("./secret.js");
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const Caver = require("caver-js");

module.exports = {
  networks: {
    baobab: {
      provider: () => {
        return new HDWalletProvider(pkey, "https://api.baobab.klaytn.net:8651");
      },
      network_id: "1001",
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value: kas_project_auth,
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          pkey_cypress,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217",
      gas: "8500000",
      gasPrice: null,
    },
  },

  compilers: {
    solc: {
      version: "0.5.6",
    },
  },
};
