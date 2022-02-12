pragma solidity ^0.5.6;

contract MyContract {
  uint256 myval = 0;
  uint256 call_count = 0;

  function set_myval(uint256 v) public {
    require(call_count < 5);
    require(myval != v);
    myval = v;
    call_count++;
  }

  function get_myval() public view returns (uint256) {
    return myval;
  }
}
