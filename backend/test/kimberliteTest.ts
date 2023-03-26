import {DiamondLoupeFacet, FacetRegistry, Kimberlite} from "../typechain-types";
import {ethers} from "hardhat";

import { getSelectors, FacetCutAction, removeSelectors, findAddressPositionInFacets } from 'diamond-1-hardhat/scripts/libraries/diamond.js'

import { deployKimberlite, deployRegistry } from '../scripts/deploy.ts';

import { assert } from 'chai';

describe('KimerliteTest', async function () {
    let registry: FacetRegistry
    let kimberlite: Kimberlite
    let diamondAddress: string
    let diamondLoupeFacet: DiamondLoupeFacet

    const addresses = []

    before(async function () {
        registry = await deployRegistry()
        kimberlite = await deployKimberlite(registry)
    })

    it('should register facet', async () => {
            console.log("Extracting diamond")
            const tx = await kimberlite.extractDiamond("metadata URI", {gasLimit: 800000});
            const receipt = await tx.wait()
            diamondAddress = receipt.events![3].args!.diamond
            const tokenId = await registry.diamondAddressToTokenId(diamondAddress);
            console.log({tokenId});
            const [owner] = await ethers.getSigners();
            assert.equal(1, (await registry.balanceOf(owner.address,  tokenId)).toNumber());
        }
    )


    it('should init storage on cut', async () => {
      const diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
      let action = FacetCutAction.Add;
      for (const FacetName of ["TrivialCharactersSystem", "SimpleCharactersSystem"]) {
        const Facet = await ethers.getContractFactory(FacetName);
        const facet = await Facet.deploy();
        await facet.deployed();
        console.log(`${FacetName} deployed: ${facet.address}`);
        const facetCuts = [{
          facetAddress: facet.address,
          action,
          functionSelectors: getSelectors(facet).get(["whatIs(uint256)", "isAlive(uint256 id)"]),
        }]
        console.log({ facetCuts });
        let functionCall = Facet.interface.encodeFunctionData('init');
        const tx = await diamondCutFacet.diamondCut(
          facetCuts,
          facet.address,
          functionCall,
          { gasLimit: 800000 }
        );
        const receipt = await tx.wait();
        if (!receipt.status) {
          throw Error(`Diamond upgrade failed: ${tx.hash}`);
        }
        action = FacetCutAction.Replace;
      }
    })

    it('should extract diamond', async () => {
            console.log("Extracting diamond")
            const tx = await kimberlite.extractDiamond("metadata URI", {gasLimit: 800000});
            const receipt = await tx.wait()
            diamondAddress = receipt.events![3].args!.diamond
        }
    )

    it('exracted diamond should have three facets', async () => {
        console.log(diamondAddress)
        diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
        for (const address of await diamondLoupeFacet.facetAddresses()) {
            addresses.push(address)
        }
        assert.equal(addresses.length, 3)
    })

})
