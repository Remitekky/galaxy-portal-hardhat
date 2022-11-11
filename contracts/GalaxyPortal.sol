// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

// Goerli : 0x6aaD5B0208F5f43009a951438B7b9246C7E9c0c9

contract GalaxyPortal {
  uint256 totalStars;

  struct Star {
    address explorer;
    string message;
    uint256 timestamp;
  }

  Star[] stars;

  event NewStar(address indexed from, uint256 timestamp, string message);

  constructor() payable {
    console.log("Let's build something cool");
  }

  function star(string memory _message) public {
    totalStars += 1;
    stars.push(Star(msg.sender, _message, block.timestamp));
    emit NewStar(msg.sender, block.timestamp, _message);
    console.log("%s send a star w/ message %s", msg.sender, _message);

    uint256 prizeAmount = 0.0001 ether;
    require(
      prizeAmount <= address(this).balance,
      "The contract has not enough funds"
    );
    (bool success, ) = (msg.sender).call{value: prizeAmount}("");
    require(success, "Failed to withdraw money from contract.");
  }

  function getAllStars() public view returns (Star[] memory) {
    return stars;
  }

  function getTotalStars() public view returns (uint256) {
    console.log("We have %d total stars", totalStars);
    return totalStars;
  }
}