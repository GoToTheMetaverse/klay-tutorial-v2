<template>
  <div class="">
    <div class="bg-white m-4 p-4 rounded-xl space-y-2">
      <div class="text-4xl">블록체인 가위바위보</div>

      <div v-if="!data.is_login">
        <button class="tw_btn" @click="onLogin()">LOGIN</button>
        <div class="mt-2 text-xl font-bold text-red-600">
          {{ data.error_msg }}
        </div>
      </div>
      <div v-else>
        <div>지갑 연결 완료</div>

        <div class="my-4">
          <div>소유자기능</div>
          <div class="flex justify-center items-center space-x-2">
            <div>비용:</div>
            <input class="w-12 border-b-2 border-black" v-model="input_fee" />
            <div class="text-xs">KLAY</div>
            <button class="tw_btn" @click="onFee()">설정</button>
          </div>
          <div class="flex justify-center items-center space-x-2">
            <div>입금:</div>
            <input
              class="w-12 border-b-2 border-black"
              v-model="input_deposit"
            />
            <div class="text-xs">KLAY</div>
            <button class="tw_btn" @click="onDeposit()">입금</button>
          </div>
        </div>

        <!-- <div>ADDR: {{ data.addr }}</div> -->
        <div class="grid grid-cols-2 gap-x-4">
          <div class="text-right">내 잔고:</div>
          <div class="text-left font-bold">{{ data.balance_me }}</div>

          <div class="text-right">컨트랙트 잔고:</div>
          <div class="text-left font-bold">{{ data.blaance_contract }}</div>

          <div class="text-right">비용:</div>
          <div class="text-left font-bold">{{ data.bet_size }}</div>
        </div>
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
import { ref, reactive } from "vue";
import Contract from "@/assets/MyGame.json";
import Caver from "caver-js";
export default {
  setup() {
    let caver = null;
    let contract = null;
    let input_fee = ref("");
    let input_deposit = ref("");
    let data = reactive({
      is_login: false,
      addr: "",
      balance_me: "",
      blaance_contract: "",
      bet_size: "",
      my_card: 0,
      return_values: null,
      is_owner: false,
    });

    function peb_to_klay(peb) {
      console.log("caver", caver, peb);
      let ret = caver.utils.fromPeb(peb, "KLAY");
      let n = Number(ret).toFixed(4);
      //   return ret;
      if (n.indexOf(".") > 0) {
        let cut = 0;
        for (let i = 0; i < n.length; i++) {
          let p = n.length - i - 1;
          if (n[p] != "0") break;
          cut++;
        }
        console.log("cut", cut, n);
        n = n.substring(0, n.length - cut);
      }
      return n + " KLAY";
    }

    let bet_size_raw = "";
    const onLogin = async () => {
      console.log("onLogin");

      if (window.klaytn === undefined) {
        data.error_msg = "카이카스 지갑을 설치해주세요";
        return;
      }

      if (window.klaytn.networkVersion != "1001") {
        data.error_msg = "테스트 넷으로 변경해주세요";
        return;
      }

      const acc = await window.klaytn.enable();
      console.log("acc", acc);
      data.is_login = true;
      data.addr = acc[0];

      caver = new Caver(window.klaytn);
      let peb;

      contract = new caver.klay.Contract(
        Contract.abi,
        Contract.networks["1001"].address
      );

      peb = await caver.klay.getBalance(data.addr);
      console.log("getBalance", peb);
      data.balance_me = peb_to_klay(peb);

      peb = await contract.methods.get_balance().call();
      console.log("get_balance", peb);
      data.blaance_contract = peb_to_klay(peb);

      peb = await contract.methods.get_bet_size().call();
      bet_size_raw = peb;
      console.log("get_bet_size", peb);
      data.bet_size = peb_to_klay(peb);

      let owner_addr = await contract.methods.owner().call();
      console.log("owner", owner_addr);
      // 0x846cf252896A5597eA8B6eB902dBC0C3EB35C637

      if (data.addr == owner_addr) {
        data.is_owner = true;
      }
    };
    const onPlay = async () => {
      //
      const tx = await contract.methods.play_game(data.my_card).send({
        from: data.addr,
        value: bet_size_raw,
        gas: "20000000",
      });
      console.log("tx", tx);
      data.return_values = tx.events.play_log.returnValues;

      let peb;
      peb = await caver.klay.getBalance(data.addr);
      console.log("getBalance", peb);
      data.balance_me = peb_to_klay(peb);

      peb = await contract.methods.get_balance().call();
      console.log("get_balance", peb);
      data.blaance_contract = peb_to_klay(peb);
    };
    const getName = (v) => {
      if (v == 0) return "가위";
      if (v == 1) return "바위";
      return "보";
    };
    const onFee = async () => {
      console.log("onFee", input_fee.value);

      let peb = caver.utils.toPeb(input_fee.value);
      console.log("peb", peb);

      await contract.methods.set_bet_size(peb).send({
        from: data.addr,
        gas: "20000000",
      });

      console.log("set_bet_fee ok", peb);
      data.bet_size = peb_to_klay(peb);
      bet_size_raw = peb;
    };

    const onDeposit = async () => {
      console.log("onDeposit", input_deposit.value);

      let peb = caver.utils.toPeb(input_deposit.value);
      console.log("peb", peb);

      await contract.methods.deposit().send({
        from: data.addr,
        value: peb,
        gas: "20000000",
      });

      peb = await contract.methods.get_balance().call();
      console.log("get_balance", peb);
      data.blaance_contract = peb_to_klay(peb);
    };

    return {
      data,
      input_fee,
      input_deposit,
      //
      onLogin,
      onPlay,
      getName,
      onFee,
      onDeposit,
    };
  },
};
</script>

<style scoped></style>
