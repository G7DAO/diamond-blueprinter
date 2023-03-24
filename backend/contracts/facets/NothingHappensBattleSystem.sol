// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/sample-facets/IBattleSystem.sol";

contract NothingHappensBattleSystem is IBattleSystem {
    function attack(uint256 enemyId) external {}
}
