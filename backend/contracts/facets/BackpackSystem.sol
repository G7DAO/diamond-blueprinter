// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "../interfaces/sample-facets/IBackupSystem.sol";

/**
    @notice simple backpack - a set of items, each item is either present or not
    */
contract BackpackSystem is IBackupSystem {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("backpack.storage");

    struct BackpackState {
        mapping(uint256 => bool) backpack;
    }

    event Put(uint256 item);
    event Drop(uint256 item);


    function diamondStorage() internal pure returns (BackpackState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function put(uint256 item) external {
        BackpackState storage backpackState = diamondStorage();
        if(!backpackState.backpack[item])
            emit Put(item);
        backpackState.backpack[item] = true;
    }

    function drop(uint256 item) external {
        BackpackState storage backpackState = diamondStorage();
        if(backpackState.backpack[item])
            emit Drop(item);
        backpackState.backpack[item] = false;
    }

    function contains(uint256 item) external view returns (bool) {
        BackpackState storage backpackState = diamondStorage();
        return backpackState.backpack[item];
    }

    function supportsInterface(bytes4 _interfaceID) external pure returns (bool) {
        return _interfaceID == interfaceId();
    }

    function interfaceId() private pure returns (bytes4){
        return this.put.selector ^ this.drop.selector ^ this.contains.selector;
    }
}
