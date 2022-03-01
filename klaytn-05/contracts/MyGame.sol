pragma solidity ^0.5.6;

contract MyGame {
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;
  }

  function get_balance() public view returns (uint256) {
    return address(this).balance;
  }

  function deposit() external payable {}

  function withdraw(uint256 peb) external payable {
    require(get_balance() >= peb, "not enough balance");
    require(msg.sender == owner);
    msg.sender.transfer(peb);
  }

  uint256 game_id = 0;
  uint256 bet_size = 0;

  function set_bet_size(uint256 peb) external {
    bet_size = peb;
  }

  function get_bet_size() external returns (uint256) {
    return bet_size;
  }

  // result : 0:패배 1:비김 2:이김
  event play_log(
    uint256 indexed game_id, // 0
    address adr, // 1
    uint256 input, // 2
    uint256 server_input, // 3
    uint256 result // 4
  );

  // input : 0:가위 1:바위 2:보
  function play_game(uint256 input) external payable {
    require(msg.value == bet_size);
    require(get_balance() * 2 > msg.value);

    uint256 server_input = block.number % 3;

    game_id++;

    if (input == server_input) {
      msg.sender.transfer(msg.value); // 다시환불
      emit play_log(game_id, msg.sender, input, server_input, 1);
      return;
    }

    bool win = true;
    if (input == 0 && server_input == 1) {
      win = false;
    } else if (input == 1 && server_input == 2) {
      win = false;
    } else if (input == 2 && server_input == 0) {
      win = false;
    }

    if (win) {
      msg.sender.transfer(msg.value * 2); // 입금의 두배를 넣어야함
      emit play_log(game_id, msg.sender, input, server_input, 2);
    } else {
      emit play_log(game_id, msg.sender, input, server_input, 0);
    }
  }
}
