// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../interfaces/sample-facets/ICharactersSystem.sol";

contract SimpleCharactersSystem is ICharactersSystem{
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


    function whatIs(uint256 id) external pure returns (uint256){return 0;}

    function isAlive(uint256 id) external pure returns (bool){return false;}
}
