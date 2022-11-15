// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

// Goerli : 0xC116F3c8be2f1b647A8E93470125b12eCF809C2a

contract GalaxyPortal {
  uint256 totalStars;
  // A "random" seed generated
  uint256 private seed;
  mapping(address => uint256) public lastWavedAt;

  struct Star {
    address explorer;
    string message;
    uint256 timestamp;
  }

  Star[] stars;

  event NewStar(address indexed from, uint256 timestamp, string message);

  constructor() payable {
    console.log("Let's build something cool");
    // Generate an initial "random" seed
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function star(string memory _message) public {
    // We make sure to wait 15 minutes before star again
    require(  
      lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
      "Wait 15m"
    );

    lastWavedAt[msg.sender] = block.timestamp;

    totalStars += 1;
    stars.push(Star(msg.sender, _message, block.timestamp));
    console.log("%s send a star w/ message %s", msg.sender, _message);

    // Generate a "random" seed for each users that send star
    seed = (block.timestamp + block.difficulty) % 100;
    console.log("Random # generated: %d", seed);

    if (seed < 50) {
      console.log("%s won !", msg.sender);

      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount <= address(this).balance,
        "The contract has not enough funds"
      );
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from contract.");
    }

    emit NewStar(msg.sender, block.timestamp, _message);
  }

  function getAllStars() public view returns (Star[] memory) {
    return stars;
  }

  function getTotalStars() public view returns (uint256) {
    console.log("We have %d total stars", totalStars);
    return totalStars;
  }
}