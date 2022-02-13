pragma solidity ^0.5.6;

import "../contracts-lib/KIPS/token/KIP17/KIP17Token.sol";

contract CodingTutorialOpenSeaAbout is KIP17Token {
  constructor() public KIP17Token("CodingTutorialOpenSeaAbout", "CTOSA") {}

  function contractURI() public view returns (string memory) {
    return "https://mynft.gunillee.repl.co/res-v3/metadata.json";
  }

  function mint(uint256 id, string memory link) public {
    mintWithTokenURI(msg.sender, id, link);
  }
}





