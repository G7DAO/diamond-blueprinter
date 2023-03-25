// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "diamond-1-hardhat/contracts/Diamond.sol";

interface IKimberlite is IERC165 {
    function extractDiamond(string memory meta) external;
}
