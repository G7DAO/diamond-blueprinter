// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TrivialCharacterSystem.sol";

contract SimpleCharactersSystem is TrivialCharacterSystem{

    //TODO add something less trivial than `TrivialCharacterSystem` does
    function whatIs(uint256 id) external pure returns (uint256){return 0;}

    function isAlive(uint256 id) external pure returns (bool){return false;}
}
