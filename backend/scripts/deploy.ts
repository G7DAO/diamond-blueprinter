import { ethers } from "hardhat";
import { getSelectors, FacetCutAction } from 'diamond-1-hardhat/scripts/libraries/diamond.js';
import { FacetRegistry, Kimberlite } from "../typechain-types";
import { verify } from "./verify";

async function deployKimberlite(facetRegistry: FacetRegistry): Promise<Kimberlite> {

  console.log('Deploying facets')
  // The `facetCuts` variable is the FacetCut[] that contains the functions to add during diamond deployment
  const facetCuts = [];
  for (const facetName of [
    'DiamondCutFacet',
    'DiamondLoupeFacet',
    'OwnershipFacet'
  ]) {
    const Facet = await ethers.getContractFactory(facetName)
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${facetName} deployed: ${facet.address}`)
    await verify(facet.address, [])
    facetCuts.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet)
    })
  }

  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  const DiamondInit = await ethers.getContractFactory('DiamondInit')
  const diamondInit = await DiamondInit.deploy()
  await diamondInit.deployed()
  console.log(`DiamondInit deployed: ${diamondInit.address}`)
  await verify(diamondInit.address, [])

  let functionCall = diamondInit.interface.encodeFunctionData('init')

  const diamondArgs = {
    owner: contractOwner.address,
    init: diamondInit.address,
    initCalldata: functionCall
  }

  const Kimberlite = await ethers.getContractFactory("Kimberlite");
  const kimberlite = await Kimberlite.deploy(facetCuts, diamondArgs, facetRegistry.address);

  await kimberlite.deployed();
  console.log(`Kimberlite deployed to ${kimberlite.address}`);
  await verify(kimberlite.address, [facetCuts, diamondArgs, facetRegistry.address])
  return kimberlite
}

async function deployRegistry(): Promise<FacetRegistry> {
  const Registry = await ethers.getContractFactory("FacetRegistry")
  console.log('Deploying FacetRegistry')
  const registry = await Registry.deploy()
  console.log(`FacetRegistry deployed to ${registry.address}`);
  await verify(registry.address, [])
  return registry
}

if (require.main === module) {
  deployRegistry()
    .then((facetRegistry) => {
      deployKimberlite(facetRegistry)
        .then(() => process.exit(0))
        .catch(error => {
          console.error(error)
          process.exit(1)
        })
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })

}

exports.deployKimberlite = deployKimberlite
exports.deployRegistry = deployRegistry
