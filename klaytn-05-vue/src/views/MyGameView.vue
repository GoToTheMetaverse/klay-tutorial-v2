<template>
  <div class="">
    <div class="bg-white m-4 p-4 rounded-xl space-y-2">
      <div class="text-4xl">MyGameView</div>
      <div v-if="!data.is_login">
        <button class="tw_btn" @click="onLogin()">LOGIN</button>
      </div>
      <div v-else>
        <div>지갑 연결 완료</div>
        <div>ADDR: {{ data.addr }}</div>
        <div>balance_me: {{ data.balance_me }}</div>
        <div>blaance_contract: {{ data.blaance_contract }}</div>
        <div>bet_size: {{ data.bet_size }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import Contract from "@/assets/MyGame.json";
import Caver from "caver-js";
export default {
  setup() {
    let caver = null;
    let contract = null;
    let data = reactive({
      is_login: false,
      addr: "",
      balance_me: "",
      blaance_contract: "",
      bet_size: "",
    });

    const onLogin = async () => {
      console.log("onLogin");

      const acc = await window.klaytn.enable();
      console.log("acc", acc);
      data.is_login = true;
      data.addr = acc[0];

      caver = new Caver(window.klaytn);
      data.balance_me = await caver.klay.getBalance(data.addr);

      contract = new caver.klay.Contract(
        Contract.abi,
        Contract.networks["1001"].address
      );

      data.blaance_contract = await contract.methods.get_balance().call();
      data.bet_size = await contract.methods.get_bet_size().call();
    };

    return {
      data,
      //
      onLogin,
    };
  },
};
</script>

<style scoped></style>
