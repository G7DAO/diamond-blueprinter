pragma solidity ^0.8.9;

import "diamond-1-hardhat/contracts/upgradeInitializers/DiamondInit.sol";
import "diamond-1-hardhat/contracts/facets/DiamondCutFacet.sol";
import "diamond-1-hardhat/contracts/facets/DiamondLoupeFacet.sol";
import "diamond-1-hardhat/contracts/facets/OwnershipFacet.sol";
import "diamond-1-hardhat/contracts/Diamond.sol";
import "diamond-1-hardhat/contracts/facets/Test1Facet.sol";
import "diamond-1-hardhat/contracts/facets/Test2Facet.sol";

contract importMock {
}