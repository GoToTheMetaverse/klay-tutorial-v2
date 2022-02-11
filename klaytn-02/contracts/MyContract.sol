pragma solidity ^0.5.6;

contract MyContract {
  uint256 myval = 0;

  function set_myval(uint256 v) public {
    myval = v;
  }

  function get_myval() public view returns (uint256) {
    return myval;
  }
}
