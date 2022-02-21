pragma solidity ^0.5.6;

contract MyContract {
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;
  }

  // function get_balance() external view returns (uint256) {
  function get_balance() public view returns (uint256) {
    return address(this).balance;
  }

  function deposit() external payable {}

  function withdraw(uint256 peb) external payable {
    require(get_balance() >= peb, "not enough balance");
    require(msg.sender == owner);
    msg.sender.transfer(peb);
  }
}
