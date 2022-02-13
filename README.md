# klay-tutorial-v2

## 간단한 설명

처음에 자습서 영상을 만들었으나 처음해보는 일이라 영상 품질이 낮았습니다. 그래서 유튜브 채널을 새로 열어서 버전이 v2 가되었습니다.

## 폴더설명

### klaytn-01

[유튜브 영상](https://www.youtube.com/watch?v=slkgcQCXEq4)

요약:

- 초기 셋팅합니다.
- 수도꼭지를 이용해 테스트 코인을 받아봅니다.
- 블로체인과 통신해서 잔고를 확인합니다.

1. [클레이튼에서 제공하는 소스](https://github.com/klaytn/klaytn-contracts)를
   가져와서 사용하는 파일만 남기고 모두 제거합니다.
2. 간단한 방식으로 지갑을 만들어냅니다.
3. 바오밥넷(테스트서버) 에서 테스트 코인을 얻습니다.
4. caver-js 를 이용해 지갑 주소의 잔고를 확인합니다.

다른 학습영상도 `klaytn-01` 을 기준으로 내용을 덧붙여서 설명드립니다.
영상에서는 `node.js` 와 `vscode` 설치과정정이 없습니다.

#### klaytn-02

[유튜브 영상](https://youtu.be/vpKJtg4cLRA)

요약:

- vscode 의 도움될만한 플러그인을 설치해봅니다.
  - pretter
  - solidity
- 스마트컨트랙트를 블록체인에 배포합니다.

1. klaytn-01 의 소스를 가져와 편집했습니다.
2. 사용하시려면 터미널을 여시고 `npm install` 을 입력해서 모듈을 설치해주세요.
3. `secret.js.template` 을 복사해서 `secret.js` 파일을 만드세요.
4. `secret.js` 을 수정합니다. pkey 에 지갑의 비밀키를 addr 에 지갑의 주소를 넣으세요.
5. `npm run build` 명령어는 솔리디티 소스를 컴파일 합니다.
6. `npm run deploy:baobab` 명령어는 솔리디티 소스를 baobab 테스트넷에 배포합니다.

### klaytn-03

[유튜브 영상] (https://youtu.be/2cl8GFFQ4Y8)

제목:  
클레이튼 블록체인 자습서 02 - 스마트컨트랙트 올리고 호출 / 실패해도 수수료가? / require 와 return 차이 / 호출수 제한하기 원리 (nft 대량 민팅용)

요약:

- 스마트컨트랙트 함수를 call() 을 이용해 호출해봅니다.
- send() 스마트컨트랙 내부 변수를 수정해봅니다.
- call() 과 send() 의 차이를 알아봅니다.
- require() 를 알아봅니다.
- require 와 return 으로 끝낼때 차이를 알아봅니다.
- klayscope 를 확인해봅니다.
- 스마트컨트랙트 를 다시 배포해봅니다. --reset 옵션
- 스마트컨트랙트 함수 호출 수를 제한해 봅니다. 수량이 한정적인 NFT 대량 민팅할때

### klaytn-etc-opensea-about

[유튜브 영상] (https://www.youtube.com/watch?v=Wxyu2kfwAjA)

제목:
오픈씨 자습서 01 - about 이란게 있습니다.

요약:

- 초보용 영상이 아닙니다.
- 실타래를 참고합니다.
- 스마트컨트랙트와 계정을 연동하는 UI 가 있습니다.
- cypress 메인넷에스마트컨트랙트를 배포합니다.
- kas 인증키 가 필요합니다. [영상](https://youtu.be/TyYV7h9knkw?t=1264)

링크:
opensea 참고 문서 : https://docs.opensea.io/docs/contract-level-metadata
json editor : https://jsoneditoronline.org/
opensea 결과물: https://opensea.io/collection/coding-tutorial-opensea-about

## 링크

- [이 소스가 있는 곳 github](https://github.com/GoToTheMetaverse/klay-tutorial-v2)
- [코딩 자습서 유튜브 채널](https://www.youtube.com/channel/UCj8eNn2MxSUB1wf5y6FR1WQ)
