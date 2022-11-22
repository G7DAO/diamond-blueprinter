require("hardhat");
const { utils } = require("ethers");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { parseUnits, formatUnits } = require("ethers").utils;
const { isFork, diamondName, getSelectors, FacetCutAction } = require("../utils/helpers");
const {
  deployWithConfirmation,
  withConfirmation,
  log,
} = require("../utils/deploy");

async function deployDiamond () {

  const {deployerAddr} = await getNamedAccounts();

  const dDiamondInit = await deployWithConfirmation(`SmallStoreDiamondInit`)
  const cDiamondInit = await ethers.getContractAt(`SmallStoreDiamondInit`,dDiamondInit.address)

  const FacetNames = [
    'DiamondCutFacet',
    'DiamondLoupeFacet',
    'OwnershipFacet'
  ]
  // // The `facetCuts` variable is the FacetCut[] that contains the functions to add during diamond deployment
  const facetCuts = []
  for (const FacetName of FacetNames) {
    const dFacet = await deployWithConfirmation(FacetName)
    const cFacet = await ethers.getContractAt(FacetName,dFacet.address)
    facetCuts.push({
      facetAddress: cFacet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(cFacet)
    })
  }

  // init function call for the DiamondInit ().
  // TODO  : modify if your init is diff
  let functionCall = cDiamondInit.interface.encodeFunctionData('init')
  // Setting arguments that will be used in the diamond constructor
  const diamondArgs = {
    owner: deployerAddr,
    init: cDiamondInit.address,
    initCalldata: functionCall
  }

  // deploy Diamond
  const dDiamond = await deployWithConfirmation(`SmallStoreDiamond`,[facetCuts,diamondArgs])

  // deploy Facets 
  await deployWithConfirmation("MeatStoreFacet");
  await deployWithConfirmation("StoreBaseFacet");
  await deployWithConfirmation("BeerWineStoreFacet");
  await deployWithConfirmation("PharmacyWineFacet");

}

const main = async () => {
  await deployDiamond()
};

main.id = "001_core";
main.skip = () => (diamondName != "SmallStore") && diamondName;
module.exports = main;
