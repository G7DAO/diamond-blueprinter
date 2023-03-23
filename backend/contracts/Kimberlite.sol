// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IKimberlite.sol";
import "diamond-1-hardhat/contracts/Diamond.sol";

contract Kimberlite is IKimberlite {
    event DiamondExtracted(address diamond, address owner);

    IDiamondCut.FacetCut[] private facetCuts;
    DiamondArgs private diamondArgs;

    constructor(IDiamondCut.FacetCut[] memory _facetCuts, DiamondArgs memory _diamondArgs) {
        for (uint i = 0; i < _facetCuts.length; i++) {
            facetCuts.push(_facetCuts[i]);
        }
        diamondArgs = _diamondArgs;
    }

    function extractDiamond() external {
        diamondArgs.owner = msg.sender;
        address diamond = address(new Diamond(facetCuts, diamondArgs));
        emit DiamondExtracted(diamond, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool){
        return this.extractDiamond.selector == interfaceId;
    }
}
