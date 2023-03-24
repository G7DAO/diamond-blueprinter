// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/sample-facets/ICharactersSystem.sol";

library CharacterStorage {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("smashcraft.character.storage");

    struct AliveState {
        mapping(uint256 => bool) alive;
    }

    function diamondStorage() internal pure returns (AliveState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function _isAlive(uint256 id) internal view returns (bool){
        AliveState storage state = diamondStorage();
        return state.alive[id];
    }

    function _spawn(uint256 id) internal {
        AliveState storage state = diamondStorage();
        state.alive[id] = true;
    }
}

contract TrivialCharacterSystem is ICharactersSystem {
    enum Characters {Nobody, Hero}
    uint256 constant HERO_ID = 1;

    //TODO use init() in Typescript in any way possible ( deploy or tests) to enable frontend do it too
    function init() external {
        _spawn(HERO_ID);
    }


    function whatIs(uint256 id) external pure returns (uint256 character){
        if (id == HERO_ID)
            character = uint256(Characters.Hero);
    }

    function isAlive(uint256 id) external view returns (bool){
        return CharacterStorage._isAlive(id);
    }
}
