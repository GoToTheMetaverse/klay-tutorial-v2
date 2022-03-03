<template>
  <div>
    <div>MyGameView</div>
    <button @click="onLogin">LOGIN</button>
  </div>
</template>

<script>
export default {
  setup() {
    const onLogin = async () => {
      console.log("onLogin");

      const acc = await window.klaytn.enable();
      console.log("acc", acc);
    };

    return { onLogin };
  },
};
</script>
