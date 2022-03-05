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
        <div>
          <button class="tw_btn" @click="data.my_card = 0">가위</button>
          <button class="tw_btn" @click="data.my_card = 1">바위</button>
          <button class="tw_btn" @click="data.my_card = 2">보</button>
          <button class="ml-4 tw_btn" @click="onPlay()">
            플레이 {{ getName(data.my_card) }}
          </button>
        </div>
        <!-- 160.915056 -->
        <!-- 160.950491 -->

        <div v-if="data.return_values !== null">
          <div>마지막 결과 로그</div>
          <div>game_id: {{ data.return_values.game_id }}</div>
          <div>input: {{ getName(data.return_values.input) }}</div>
          <div>
            server_input: {{ getName(data.return_values.server_input) }}
          </div>
          <div>result: {{ data.return_values.result }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import Contract from "@/assets/MyGame.json";
import Caver from "caver-js";
export default {
  data() {},
  mounted() {},
  
  setup() {
    let caver = null;
    let contract = null;
    let data = reactive({
      is_login: false,
      addr: "",
      balance_me: "",
      blaance_contract: "",
      bet_size: "",
      my_card: 0,
      return_values: null,
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
    const onPlay = async () => {
      //
      const tx = await contract.methods.play_game(data.my_card).send({
        from: data.addr,
        value: data.bet_size,
        gas: "20000000",
      });
      console.log("tx", tx);
      data.return_values = tx.events.play_log.returnValues;
    };
    const getName = (v) => {
      if (v == 0) return "가위";
      if (v == 1) return "바위";
      return "보";
    };

    return {
      data,
      //
      onLogin,
      onPlay,
      getName,
    };
  },
};
</script>

<style scoped></style>
