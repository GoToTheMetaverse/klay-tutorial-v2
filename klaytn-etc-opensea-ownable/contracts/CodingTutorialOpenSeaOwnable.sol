pragma solidity ^0.5.6;

// import "../contracts-lib/KIPS/token/KIP17/KIP17Token.sol";
import "./KIP17OwnableFlattened.sol";

contract CodingTutorialOpenSeaOwnable is KIP17TokenOwnable {
  constructor()
    public
    KIP17TokenOwnable("TestCodingTutorialOpenSeaOwnable2", "CTOSO2")
  {}

  // 소유주만 호출 가능한 민팅 함수
  function mint(uint256 id, string memory link) public {
    mintWithTokenURI(msg.sender, id, link);
  }

  // 일반 유저도 호출 가능한 민팅 함수
  function mintGeust(uint256 id, string memory link) public {
    _mint(msg.sender, id);
    _setTokenURI(id, link);
  }
}
