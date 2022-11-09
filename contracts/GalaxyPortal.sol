// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

// Goerli : 0xBdBaE474bEEBC90534068F68440E118b72d276b9

contract GalaxyPortal {
  uint256 totalStars;

  struct Star {
    address explorer;
    string message;
    uint256 timestamp;
  }

  Star[] stars;

  event NewStar(address indexed from, uint256 timestamp, string message);

  constructor() {
    console.log("Let's build something cool");
  }

  function star(string memory _message) public {
    totalStars += 1;
    stars.push(Star(msg.sender, _message, block.timestamp));
    console.log("%s send a star w/ message %s", msg.sender, _message);
  }

  function getAllStars() public view returns (Star[] memory) {
    return stars;
  }

  function getTotalStars() public view returns (uint256) {
    console.log("We have %d total stars", totalStars);
    return totalStars;
  }
}