import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import { marked } from "marked";

const method_name = "mintGeust";
const is_mainnet = false;
const title = marked(
  `
### 나만의 NFT 만들기
<sub>
    웹에 올려두고 느긋하게 기다리세요<br/>
    오픈씨는 관리하기 힘듭니다.
</sub>
`.trim()
);

const footer = marked(
  `
좋아요, 구독 감사합니다.
`.trim()
);

const app = createApp(App);
app.config.globalProperties.$g = {
  title,
  footer,
  is_mainnet,
  method_name,
};
app.use(store).use(router).mount("#app");
