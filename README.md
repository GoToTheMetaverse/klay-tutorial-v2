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

선행작업:

1. secret.js.template 파일을 이용해서 secret.js 파일을 만드세요
2. secret.js 파일에 지갑 주소와 비밀키를 입력합니다.

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

[유튜브 영상](https://youtu.be/2cl8GFFQ4Y8)

선행작업:

1. secret.js.template 파일을 이용해서 secret.js 파일을 만드세요
2. secret.js 파일에 지갑 주소와 비밀키를 입력합니다.

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

### klaytn-04

[유튜브 영상](https://www.youtube.com/watch?v=bE3R9SJNWiw)

선행작업:

1. secret.js.template 파일을 이용해서 secret.js 파일을 만드세요
2. secret.js 파일에 지갑 주소와 비밀키를 입력합니다.
3. 테스트할때는 pkey_cypress 와 kas_project_auth 는 사용하지 않습니다.

요약:

- 스마트컨트렉트에 지갑이 있습니다.
- 입출금을 해봅시다.
- 출금은 나만 되도록 고칩니다.
- npm 스크립트를 UI 로 쉽게 실행하기
- ligature (fira code) 라는게 있...

### klaytn-etc-opensea-about

이 강좌는 삭제 되었습니다.

klaytn-etc-opensea-ownable 강좌가 훨씬 유용합니다.
[링크](https://www.youtube.com/watch?v=J2kdqKOEd-0)

### klaytn-etc-opensea-ownable

코인리서치의 오픈씨 컬랙션을 편집기능이 있는 NFT 영상  
[링크](https://www.youtube.com/watch?v=J2kdqKOEd-0)

6분 10초에 콜렉션 편집부분이 보이게됩니다.

영상에 사용된 소스코드 깃헙  
[링크](https://github.com/coinResearch2021/nfttutorial)

따라하기 순서

1. secret.js.template 파일을 참고하여 secret.js 파일을 만드세요
2. secret.js 파일에 지갑 주소와 비밀키를 입력합니다.
3. kas console 에서 kas_project_auth 키를 받습니다.
4. `npm install` 명령을 이용해 모듈을 설치합니다.
5. contracts/CodingTutorialOpenSeaOwnable.sol 파일을 수정하세요
   - KIP17TokenOwnable(NFT명, NFT심볼) 순으로 입력되어있습니다.  
     원하시는 내용으로 변경하세요.
6. 파일명을 고치셨다면 migrations/2_contract_migration.js 부분을 수정해야합니다.

여기서 부터는 메인넷에 올라가는 작업입니다.
테스트할 용도라면 오픈씨에서 미리 점유되지 않도록
테스트이름을 사용해주세요.

7. `npm run deploy:cypress` 명령으로 배포합니다.
8. `node mint.js` 를 이용해 민팅을 합니다.

요약:

- 이전에 올린 About 영상은 이제 쓸모가 없어졌습니다.
- 이방법이 최선입니다.

## 외부 링크

- [이 소스가 있는 곳 github](https://github.com/GoToTheMetaverse/klay-tutorial-v2)
- [코딩 자습서 유튜브 채널](https://www.youtube.com/channel/UCj8eNn2MxSUB1wf5y6FR1WQ)
