// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract GalaxyPortal {
  uint256 totalStars;
  mapping (address => uint256) explorerStars;
  address[] explorers;

  constructor() {
    console.log("Let's build something cool");
  }

  function star() public {
    totalStars += 1;
    explorerStars[msg.sender] += 1;
    explorers.push(msg.sender);
    console.log("%s give you a star !", msg.sender);
  }

  function getExplorerStars(address _explorer) public view returns (uint256) {
    console.log("%s give you %d star(s) !", msg.sender, explorerStars[_explorer]);
    return explorerStars[_explorer];
  }

  function getExplorers() public view returns (address[] memory) {
    console.log("you have %d web3 space explorers !", explorers.length);
    return explorers;
  }

  function getTotalStars() public view returns (uint256) {
    console.log("We have %d total stars", totalStars);
    return totalStars;
  }
}