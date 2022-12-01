const { ethers } = require("hardhat");
const hre = require("hardhat");
const {diamondName} = require("../utils/helpers");

async function defaultFixture() {
    await deployments.fixture();
    const cDiamond = await ethers.getContract(`${diamondName}Diamond`);
    const cDiamondCutFacet = await ethers.getContractAt('DiamondCutFacet', cDiamond.address)
    const cDiamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', cDiamond.address)
    const cOwnershipFacet = await ethers.getContractAt('OwnershipFacet', cDiamond.address)

    //following facets are independent
    const cMeatStoreFacet = await ethers.getContract("MeatStoreFacet");
    const cMeatStoreFacetProxy = await ethers.getContractAt("MeatStoreFacet",cDiamond.address);
    const cStoreBaseFacet = await ethers.getContract("StoreBaseFacet");
    const cStoreBaseFacetProxy = await ethers.getContractAt("StoreBaseFacet",cDiamond.address);
    const cBeerWineStoreFacet = await ethers.getContract("BeerWineStoreFacet");
    const cBeerWineStoreFacetProxy = await ethers.getContractAt("BeerWineStoreFacet",cDiamond.address);

    //export accounts for testing
    const signers = await ethers.getSigners();

    const sig1 = signers[0];
    const sig2 = signers[1];
    const sig3 = signers[2];
    return {
        cDiamond,
        cDiamondCutFacet,
        cDiamondLoupeFacet,
        cOwnershipFacet,
        cMeatStoreFacet,
        cMeatStoreFacetProxy,
        cStoreBaseFacet,
        cStoreBaseFacetProxy,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy,
        sig1,
        sig2,
        sig3
    }
}


async function allFixture() {
    await deployments.fixture();
    const cDiamond1 = await ethers.getContract(`SmallStoreDiamond`);
    const cDiamondCutFacet1 = await ethers.getContractAt('DiamondCutFacet', cDiamond1.address)
    const cDiamondLoupeFacet1 = await ethers.getContractAt('DiamondLoupeFacet', cDiamond1.address)
    const cOwnershipFacet1 = await ethers.getContractAt('OwnershipFacet', cDiamond1.address)

    //following facets are independent
    const cMeatStoreFacet = await ethers.getContract("MeatStoreFacet");
    const cMeatStoreFacetProxy1 = await ethers.getContractAt("MeatStoreFacet",cDiamond1.address);
    const cStoreBaseFacet = await ethers.getContract("StoreBaseFacet");
    const cStoreBaseFacetProxy1 = await ethers.getContractAt("StoreBaseFacet",cDiamond1.address);
    const cBeerWineStoreFacet = await ethers.getContract("BeerWineStoreFacet");
    const cBeerWineStoreFacetProxy1 = await ethers.getContractAt("BeerWineStoreFacet",cDiamond1.address);


    const cDiamond2 = await ethers.getContract(`BigStoreDiamond`);
    const cDiamondCutFacet2 = await ethers.getContractAt('DiamondCutFacet', cDiamond2.address)
    const cDiamondLoupeFacet2 = await ethers.getContractAt('DiamondLoupeFacet', cDiamond2.address)
    const cOwnershipFacet2 = await ethers.getContractAt('OwnershipFacet', cDiamond2.address)

    //following facets are independent
    const cMeatStoreFacetProxy2 = await ethers.getContractAt("MeatStoreFacet",cDiamond2.address);
    const cStoreBaseFacetProxy2 = await ethers.getContractAt("StoreBaseFacet",cDiamond2.address);
    const cBeerWineStoreFacetProxy2 = await ethers.getContractAt("BeerWineStoreFacet",cDiamond2.address);

    const cPharmacyWineFacet = await ethers.getContract("PharmacyWineFacet");
    const cPharmacyWineFacetProxy2 = await ethers.getContractAt("PharmacyWineFacet",cDiamond2.address);
    //export accounts for testing
    const signers = await ethers.getSigners();

    const sig1 = signers[0];
    const sig2 = signers[1];
    const sig3 = signers[2];
    return {
        cDiamond1,
        cDiamondCutFacet1,
        cDiamondLoupeFacet1,
        cOwnershipFacet1,
        cMeatStoreFacet,
        cMeatStoreFacetProxy1,
        cStoreBaseFacet,
        cStoreBaseFacetProxy1,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy1,
        cDiamond2,
        cDiamondCutFacet2,
        cDiamondLoupeFacet2,
        cOwnershipFacet2,
        cMeatStoreFacetProxy2,
        cStoreBaseFacetProxy2,
        cBeerWineStoreFacetProxy2,
        cPharmacyWineFacet,
        cPharmacyWineFacetProxy2,
        sig1,
        sig2,
        sig3
    }
}

module.exports = {
    defaultFixture,
    allFixture
}