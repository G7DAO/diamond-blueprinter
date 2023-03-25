// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRegistry {
    function createFacetAddress(address addr, string memory meta) external;

    function mintDiamond(address addr, address to, string memory meta) external;

    function mintStorage(string memory storageSlot, string memory metadata) external;

    function mintFacet(address addr, address to) external;
}
