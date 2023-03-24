// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICharactersSystem {
    event Spawn(uint256 character);
    event Die(uint256 character);

    function whatIs(uint256 id) external view returns (uint256);

    function isAlive(uint256 id) external view returns (bool);
}
