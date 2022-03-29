pragma experimental ABIEncoderV2;
pragma solidity ^0.5.6;

import "./KIP17OwnableFlattened.sol";

contract MyNFT is KIP17TokenOwnable {
  struct Data {
    uint256 fee;
    uint256 count;
  }

  Data data;
  string URL = "https://mynft.gunillee.repl.co/klaytn-06/";

  constructor() public KIP17TokenOwnable("MyNFT", "MYNFT") {
    data = Data(1 ether, 0);
    // data.fee = 1 ether;
    // data.count = 0;
  }

  function getData() public view returns (Data memory) {
    return data;
  }

  function setFee(uint256 _fee) public onlyOwner {
    data.fee = _fee;
  }

  function setCount(uint256 _count) public onlyOwner {
    data.count = _count;
  }

  function deposit() external payable {}

  function withdraw(uint256 peb) external payable {
    uint256 balance = address(this).balance;
    require(balance >= peb);
    require(msg.sender == owner());
    msg.sender.transfer(peb);
  }

  // 일반 유저도 호출 가능한 민팅 함수
  function mintGeust() public payable {
    require(data.fee == msg.value);

    uint256 id = totalSupply() + 1;
    require(data.count >= id);

    string memory s_id = uintToString(id);
    string memory link = strConcat(URL, s_id, ".json", "", "");
    // https://mynft.gunillee.repl.co/klaytn-06/1.json
    _mint(msg.sender, id);
    _setTokenURI(id, link);
  }

  //------------------
  // private
  //------------------
  function uintToString(uint256 v) private pure returns (string memory str) {
    if (v == 0) {
      return "0";
    }

    uint256 j = v;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }

    bytes memory bstr = new bytes(len);
    uint256 _i = v;
    uint256 k = len - 1;
    while (_i != 0) {
      bstr[k--] = bytes1(uint8(48 + (_i % 10)));
      _i /= 10;
    }
    return string(bstr);
  }

  function strConcat(
    string memory _a,
    string memory _b,
    string memory _c,
    string memory _d,
    string memory _e
  ) private pure returns (string memory) {
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    bytes memory _bc = bytes(_c);
    bytes memory _bd = bytes(_d);
    bytes memory _be = bytes(_e);
    string memory abcde = new string(
      _ba.length + _bb.length + _bc.length + _bd.length + _be.length
    );
    bytes memory babcde = bytes(abcde);
    uint256 i;
    uint256 k = 0;
    for (i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
    for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
    for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
    for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
    return string(babcde);
  }
}
