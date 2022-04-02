import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import { marked } from "marked";

const method_name = "mintGeust";
// const is_mainnet = true;
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
하단부 메세지 입니다.  
좋아요, 구독 감사합니다.  

<div class="flex justify-end space-x-2">
<a href="https://www.youtube.com/channel/UCj8eNn2MxSUB1wf5y6FR1WQ" target="_blank">
  <img class="w-8 h-8" src="/img/icons/codingtutorial_64x64.png"/>
</a>
</div>
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
