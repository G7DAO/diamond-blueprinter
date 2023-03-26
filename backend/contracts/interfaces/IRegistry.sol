// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRegistry {
    enum TokenType {Diamond, Facet, DiamondStorage}

    function createFacetAddress(address addr, string memory meta) external;

    function mintDiamond(address addr, address to, string memory meta) external;

    function mintStorage(string memory storageSlot, string memory metadata) external;

    function mintFacet(address addr, address to) external;

    function tokenType(uint256 tokenId) external returns(TokenType);
}
