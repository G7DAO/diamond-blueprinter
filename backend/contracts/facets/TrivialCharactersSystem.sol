// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/sample-facets/ICharactersSystem.sol";
import "./CharactersStorage.sol";


contract TrivialCharactersSystem is ICharactersSystem {
    enum Characters {Nobody, Hero}
    uint256 constant HERO_ID = 1;

    //TODO use init() in Typescript in any way possible ( deploy or tests) to enable frontend do it too
    function init() external {
        CharactersStorage._spawn(HERO_ID);
    }


    function whatIs(uint256 id) external pure virtual returns (uint256 character){
        if (id == HERO_ID)
            character = uint256(Characters.Hero);
    }

    function isAlive(uint256 id) external view virtual returns (bool){
        return CharactersStorage._isAlive(id);
    }
}
