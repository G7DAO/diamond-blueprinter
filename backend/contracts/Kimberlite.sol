// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IKimberlite.sol";
import "diamond-1-hardhat/contracts/Diamond.sol";

contract Kimberlite is IKimberlite {
    event DiamondExtracted(address diamond, address owner);

    IDiamondCut.FacetCut[] emptyFacetCuts;
    DiamondArgs private diamondArgs;

    function extractDiamond() external {
        diamondArgs.owner = msg.sender;

        address diamond = address(new Diamond(emptyFacetCuts, diamondArgs));
        emit DiamondExtracted(diamond, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool){
        return this.extractDiamond.selector == interfaceId;
    }
}
