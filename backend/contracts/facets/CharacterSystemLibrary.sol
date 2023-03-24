// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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