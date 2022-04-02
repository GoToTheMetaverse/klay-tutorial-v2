# NFT 자판기 사이트 (프론트엔드)

## 작업순서

1. 솔리디티 파일을 빌드해 만들어진 abi 파일을 src/assets/MyNFT.json 파일을 옮기세요.
   abi 파일은 메인넷이나 테스트넷에 이미 배포된 상태야아합니다.

2. src/main.js 에 설정값을 변경하세요.

   1. method_name : 솔리디티에 작성된 민팅함수의 이름입니다. 민팅시 이 함수를 사용하게 됩니다.
   2. is_mainnet : 메인넷을 사용할지 테스트넷을 사용할지 정하는 변수 입니다.
   3. title : 상단에 표시될 문구 입니다. 마크다운 형식입니다.
   4. footer : 하단에 표실될 문구 입니다.
      코딩자습서 유튜브 링크가 들어있습니다.
      보기 허전시다면 넣어주셔도 좋습니다.

   5. 이미지를 수정하세요
      /src/assets/logo.png : 상단에 이미지
      /src/assets/machine.png : 화살표가 없는 자판기
      /src/assets/machine-arrow.png : 화살표가 있는 자판기
      /src/assets/machine-empty.png : 모두 다 팔린상태 자판기
      /public/favicon.ico : 파비콘, 웹브라우저에서 표시됩니다.
      /public/img/icons/android-chrome-192x192.png : 크롬에서 표시됩니다.

3. `npm install -g yarn` 으로 yarn 을 설치합니다.
4. `yarn install` 로 모듈을 설치합니다.
5. `yarn serve` 로 웹페이지를 테스트해보실 수 있습니다.
6. `yarn build` 를 하면 웹페이지가 빌드되며 `dist` 폴더가생깁니다.
7. replit 에 프로젝트르 만드시고 dist 안에 파일을 드래그 드롭으로 웹에 올릴 수 있습니다.
