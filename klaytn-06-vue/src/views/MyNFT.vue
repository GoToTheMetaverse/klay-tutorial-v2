<template>
  <div class="flex justify-center px-2 py-8">
    <div class="max-w-sm w-full bg-white rounded-2xl p-4 space-y-4">
      <div class="flex justify-between items-center space-x-4">
        <img class="w-28 h-28" src="../assets/logo.png" />
        <div class="text-left" v-html="$g.title"></div>
      </div>
      <div v-if="!data.is_wallet_connect">
        <button class="tw-indigo-btn" @click="onWalletEnable()">
          카이카스 지갑 연결{{ data.network_name_text }}
        </button>
      </div>
      <!-- <div>{{ data.wallet_address }}</div>
      <div>{{ data.owner_address }}</div> -->
      <div
        v-if="
          data.wallet_address !== null &&
          data.wallet_address_lower === data.owner_address_lower
        "
        class="space-y-3"
      >
        <div>소유자 기능</div>
        <div class="flex items-center space-x-3">
          <div class="w-16">수량</div>
          <div class="w-36">
            <input
              v-model="input_count"
              class="w-full border-b-2 border-gray-500"
            />
          </div>
          <div class="w-16">
            <button class="tw-indigo-btn" @click="onEditCount()">수정</button>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-16">비용</div>
          <div class="w-36">
            <input
              v-model="input_fee"
              class="w-full border-b-2 border-gray-500"
            />
          </div>
          <div class="w-16">
            <button class="tw-indigo-btn" @click="onEditFee()">수정</button>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-16">출금</div>
          <div class="w-36 flex border-b-2 border-gray-500 space-x-3">
            <input v-model="input_balance" class="w-full text-right" />
            <div>KLAY</div>
          </div>
          <div>
            <button class="tw-indigo-btn" @click="onWithdraw()">출금</button>
          </div>
        </div>
      </div>
      <div v-if="data.is_wallet_connect" class="flex justify-around">
        <div class="tw-card">
          <div class="tw-card-title">민팅비용</div>
          <div class="tw-card-desc">{{ data.fee_text }}<sub> KLAY</sub></div>
        </div>
        <div class="tw-card">
          <div class="tw-card-title">남은수 / 발행수</div>
          <div class="tw-card-desc">{{ data.left_count_text }}</div>
        </div>
        <div class="tw-card">
          <div class="tw-card-title">컨트렉트</div>
          <div class="tw-card-desc">
            <a :href="getKlayscope()" target="_blank">
              {{ data.contract_text }}
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="data.error_msg != ''"
        class="p-2 bg-red-600 text-white rounded-full"
      >
        {{ data.error_msg }}
      </div>
      <div v-if="data.last_mint_data !== null">
        <div v-if="data.last_mint_data.name !== undefined" class="text-xl">
          {{ data.last_mint_data.name }}
        </div>
        <div v-if="data.last_mint_data.description !== undefined">
          {{ data.last_mint_data.description }}
        </div>
        <div v-if="data.last_mint_data.image !== undefined">
          <img :src="data.last_mint_data.image" />
        </div>
        <div>
          <button class="tw-indigo-btn" @click="data.last_mint_data = null">
            닫기
          </button>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <img v-if="!data.is_wallet_connect" src="@/assets/machine.png" />
        <img v-else-if="data.show_empty" src="@/assets/machine-empty.png" />
        <button v-else @click="onMinting()">
          <img
            v-if="data.show_arrow && data.animated_arrow"
            src="@/assets/machine-arrow.png"
          />
          <img v-else src="@/assets/machine.png" />
        </button>
      </div>
      <div v-html="$g.footer"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import Contract from "@/assets/MyNFT.json";
import Caver from "caver-js";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const $g = proxy.$g;

    const data = reactive({
      show_empty: false,
      show_arrow: false,
      animated_arrow: false,
      fee_peb: "",
      fee_text: "",
      total: 0,
      count: 0,
      left_count: 0,
      left_count_text: "",
      network_name_text: "",
      is_wallet_connect: false,
      contract_text: "",
      // contract_balance_text: "",
      error_msg: "",
      caver: null,
      contract: null,
      contract_address: null,
      wallet_address: null,
      wallet_address_lower: null,
      owner_address: null,
      owner_address_lower: null,
      last_mint_data: null,
    });

    let input_fee = ref("");
    let input_count = ref("");
    let input_balance = ref("");

    if (!$g.is_mainnet) {
      data.network_name_text = " (Baobab)";
    }

    let caver = null;
    let contract = null;
    if (window.klaytn === undefined) {
      data.error_msg = "카이카스 지갑이 설치후 재방문해주세요.";
    } else {
      caver = new Caver(window.klaytn);
      let networkId = "1001";
      if ($g.is_mainnet) networkId = "8217";

      const con_addr = Contract.networks[networkId].address;
      contract = new caver.klay.Contract(Contract.abi, con_addr);
      data.contract_address = con_addr;
      data.contract_text =
        con_addr.substring(0, 5) +
        "..." +
        con_addr.substring(con_addr.length - 3);
    }

    data.caver = caver;
    data.contract = contract;

    const updateData = async () => {
      // const bal_peb = await caver.klay.getBalance(data.contract_address);
      const con_data = await contract.methods.getData().call();
      console.log("updateData", con_data);
      const total = await contract.methods.totalSupply().call();
      const count = Number(con_data.count);
      let left = count - total;
      if (left < 0) left = 0;

      data.total = total;
      data.count = count;
      data.left_count = left;
      data.left_count_text = `${left} /  ${total}`;

      let fee = caver.utils.fromPeb(con_data.fee, "KLAY");
      data.fee_peb = con_data.fee;
      data.fee_text = fee;

      // let bal = caver.utils.fromPeb(bal_peb, "KLAY");
      // data.contract_balance_peb = bal_peb;
      // data.contract_balance_text = bal_peb;

      if (data.total < data.count) {
        data.show_empty = false;
        data.animated_arrow = true;
      } else {
        data.show_empty = true;
      }
    };

    const onEditCount = async () => {
      console.log("onEditCount", input_count.value);

      await contract.methods.setCount(input_count.value).send({
        from: window.klaytn.selectedAddress,
        gas: "20000000",
      });

      await updateData();
      input_count.value = "";
    };

    const onEditFee = async () => {
      console.log("onEditFee", input_fee.value);

      data.error_msg = "";

      let peb;
      try {
        peb = caver.utils.toPeb(input_fee.value, "KLAY");
        console.log("peb", peb);
      } catch (err) {
        console.log("err", err.message);
        data.error_msg = "숫자를 입력해주세요";
        return;
      }

      await contract.methods.setFee(peb).send({
        from: window.klaytn.selectedAddress,
        gas: "20000000",
      });

      await updateData();
      input_fee.value = "";
    };

    const onWithdraw = async () => {
      console.log("onWithdraw", input_balance.value);

      data.error_msg = "";

      let peb;
      try {
        peb = caver.utils.toPeb(input_balance.value, "KLAY");
        console.log("peb", peb);
      } catch (err) {
        console.log("topeb err", err.message);
        data.error_msg = "숫자를 입력해주세요";
        return;
      }

      try {
        await contract.methods.withdraw(peb).send({
          from: window.klaytn.selectedAddress,
          gas: "20000000",
        });
      } catch (err) {
        console.log("contract err", err);
        if (err.code == -32603) return;
        data.error_msg = "컨트렉트의 잔액을 확인해주세요";
        return;
      }

      await updateData();
      input_balance.value = "";
    };

    const onWalletEnable = async () => {
      console.log("onWalletEnable");
      data.error_msg = "";

      let networkId = "1001";
      if ($g.is_mainnet) networkId = "8217";
      if (window.klaytn.networkVersion != networkId) {
        if ($g.is_mainnet) {
          data.error_msg = "지갑의 네트워크를 메인넷으로 설정해주세요";
        } else {
          data.error_msg = "지갑의 네트워크를 Baobab으로 설정해주세요";
        }

        return;
      }

      try {
        let accounts = await window.klaytn.enable();
        if (!Array.isArray(accounts)) throw Error("accounts is not array");
        if (accounts.length < 1) throw Error("accounts length fail");

        data.wallet_address = accounts[0];
        data.wallet_address_lower = data.wallet_address.toLowerCase();
        console.log("wallet_address", data.wallet_address);
      } catch (err) {
        console.log("wallet login fail", err.message);
        data.error_msg = "지갑 연동이 실패하였습니다.";
        return;
      }

      data.owner_address = await contract.methods.owner().call();
      data.owner_address_lower = data.owner_address.toLowerCase();
      console.log("owner_addr", data.owner_address);

      await updateData();

      data.is_wallet_connect = true;
    };

    const onMinting = async () => {
      console.log("onMinting");

      // let whitelist = [
      //   "0x1e0A33d97f7793035704F5B0d896c631fb47BbE4", // bao-sub
      //   "0x65EfC5ce9D6aB663365ac5452f52168f227a5d93", // bao-main
      // ];
      // if (whitelist.indexOf(data.wallet_address) < 0) {
      //   data.error_msg = "등록되지 않은 지갑 주소입니다.";
      //   return;
      // }

      data.error_msg = "";
      if (!data.is_wallet_connect) {
        data.error_msg = "지갑연동이 필요합니다.";
        return;
      }

      await updateData();
      if (data.left_count <= 0) {
        data.error_msg = "남은 수량이 부족합니다.";
        return;
      }

      const func = contract.methods[$g.method_name];
      const ret = await func().send({
        from: window.klaytn.selectedAddress,
        value: data.fee_peb,
        gas: "20000000",
      });
      // https://mynft.gunillee.repl.co/klaytn-06/1.json
      try {
        console.log("events", ret.events);
        const id = ret.events.Transfer.returnValues.tokenId;
        const link = await contract.methods.tokenURI(id).call();
        console.log("link", link);
        const fetch_res = await fetch(link);
        const fetch_json = await fetch_res.json();
        console.log("fetch_json", fetch_json);
        data.last_mint_data = fetch_json;
      } catch (err) {
        console.log("err", err.message);
      }
    };

    setInterval(() => {
      data.show_arrow = !data.show_arrow;
    }, 800);

    const getKlayscope = () => {
      let url = "https://baobab.scope.klaytn.com/account/";
      if ($g.is_mainnet) url = "https://scope.klaytn.com/account/";
      return url + data.contract_address;
    };

    return {
      data,
      onMinting,
      onWalletEnable,
      getKlayscope,
      input_fee,
      input_count,
      input_balance,
      onEditCount,
      onEditFee,
      onWithdraw,
    };
  },
};
</script>

<style scoped>
.tw-card {
  @apply w-24 rounded-lg shadow-lg;
}

.tw-card-title {
  @apply pb-1 text-xs text-xs text-left border-b-4 border-gray-400;
}

.tw-card-desc {
  @apply text-right;
}

.tw-indigo-btn {
  @apply px-4 py-2 bg-indigo-600 text-white rounded-full;
}
</style>
