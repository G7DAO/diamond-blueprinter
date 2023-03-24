// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBackpackSystem {
    function put(uint256 item) external;

    function drop(uint256 item) external;

    function contains(uint256 item) external view returns (bool);
}
