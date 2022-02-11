# klay-tutorial-v2

## 간단한 설명

처음에 자습서 영상을 만들었으나 처음해보는 일이라 영상 품질이 낮았습니다. 그래서 유튜브 채널을 새로 열어서 버전이 v2 가되었습니다.

## 폴더설명

### klaytn-01

[유튜브 영상](https://www.youtube.com/watch?v=slkgcQCXEq4)

요약: 초기 셋팅과 수도꼭지를 이용해 테스트 코인을 받고 블로체인과 통신해서 잔고를 확인합니다.

1. [클레이튼에서 제공하는 소스](https://github.com/klaytn/klaytn-contracts)를
   가져와서 사용하는 파일만 남기고 모두 제거합니다.
2. 간단한 방식으로 지갑을 만들어냅니다.
3. 바오밥넷(테스트서버) 에서 테스트 코인을 얻습니다.
4. caver-js 를 이용해 지갑 주소의 잔고를 확인합니다.

다른 학습영상도 `klaytn-01` 을 기준으로 내용을 덧붙여서 설명드립니다.
영상에서는 `node.js` 와 `vscode` 설치과정정이 없습니다.

#### klaytn-02

[유튜브 영상](https://youtu.be/vpKJtg4cLRA)

요약: vscode 의 도움될만한 플러그인을 설치하고
스마트컨트렉트를 블록체인에 배포합니다.

1. klaytn-01 의 소스를 가져와 편집했습니다.
2. 사용하시려면 터미널을 여시고 `npm install` 을 입력해서 모듈을 설치해주세요.
3. `secret.js.template` 을 복사해서 `secret.js` 파일을 만드세요.
4. `secret.js` 을 수정합니다. pkey 에 지갑의 비밀키를 addr 에 지갑의 주소를 넣으세요.
5. `npm run build` 명령어는 솔리디티 소스를 컴파일 합니다.
6. `npm run deploy:baobab` 명령어는 솔리디티 소스를 baobab 테스트넷에 배포합니다.

## 링크

- [이 소스가 있는 곳 github](https://github.com/GoToTheMetaverse/klay-tutorial-v2)
- [코딩 자습서 유튜브 채널](https://www.youtube.com/channel/UCj8eNn2MxSUB1wf5y6FR1WQ)
