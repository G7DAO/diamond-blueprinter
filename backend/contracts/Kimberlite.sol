// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./interfaces/IKimberlite.sol";
import "diamond-1-hardhat/contracts/Diamond.sol";

contract Kimberlite is IKimberlite {
    event DiamondExtracted(address diamond, address owner);

    DiamondArgs private diamondArgs;

    function extractDiamond() external {
        diamondArgs.owner = msg.sender;
        IDiamondCut.FacetCut[] memory facetCuts;

        address diamond = address(new Diamond(facetCuts, diamondArgs));
        emit DiamondExtracted(diamond, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) external view returns (bool){
        return false;
    }
}
