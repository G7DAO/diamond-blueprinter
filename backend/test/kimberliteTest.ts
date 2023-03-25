import { DiamondLoupeFacet, Kimberlite } from "../typechain-types";
import { ethers } from "hardhat";

const {deployKimberlite} = require('../scripts/deploy.ts')

const {assert} = require('chai')

describe('KimerliteTest', async function () {
    let kimberlite: Kimberlite
    let diamondAddress: string
    let diamondLoupeFacet: DiamondLoupeFacet

    const addresses = []

    before(async function () {
        kimberlite = await deployKimberlite()
    })

    it('should extract diamond', async () => {
            console.log("Extracting diamond")
            const tx = await kimberlite.extractDiamond({gasLimit: 800000});
            const receipt = await tx.wait()
            diamondAddress = receipt.events![2].args!.diamond
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
