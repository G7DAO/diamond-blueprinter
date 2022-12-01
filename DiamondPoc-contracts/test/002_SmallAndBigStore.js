const { expect } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");
const { defaultFixture, allFixture } = require("./_fixture");
const {
  loadFixture,
  diamondName,
  getSelectors,
  FacetCutAction,
} = require("../utils/helpers");
const { parseUnits } = require("ethers/lib/utils");
const { withConfirmation } = require("../utils/deploy");
const { utils } = require("ethers");


describe("Diamond 2 & 1: Big Store", async () => {
  describe("Meat Store Facet", async () => {
    it("test all integrations coz no time", async () => {
      const {
        cDiamondCutFacet1,
        cDiamondCutFacet2,
        cStoreBaseFacet,
        cStoreBaseFacetProxy1,cStoreBaseFacetProxy2,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy1,cBeerWineStoreFacetProxy2,
        cMeatStoreFacetProxy1,cMeatStoreFacetProxy2,
        cMeatStoreFacet,
        cPharmacyWineFacet,
        cPharmacyWineFacetProxy2,
        sig2,sig3
      } = await loadFixture(allFixture);
      await withConfirmation(
        cDiamondCutFacet1.diamondCut(
          [
            {
              facetAddress: cStoreBaseFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cStoreBaseFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );
      await withConfirmation(
        cDiamondCutFacet1.diamondCut(
          [
            {
              facetAddress: cBeerWineStoreFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cBeerWineStoreFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );
      await withConfirmation(
        cDiamondCutFacet1.diamondCut(
          [
            {
              facetAddress: cMeatStoreFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cMeatStoreFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );
      await withConfirmation(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: cStoreBaseFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cStoreBaseFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );
      await withConfirmation(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: cBeerWineStoreFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cBeerWineStoreFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );
      await withConfirmation(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: cMeatStoreFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cMeatStoreFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );
      // simple add operations and checks
      await withConfirmation(cBeerWineStoreFacetProxy1.addAlcohol("Heineken"));
      await withConfirmation(cMeatStoreFacetProxy1.addMeat("Lamb"));
      await withConfirmation(cMeatStoreFacetProxy2.addMeat("Beef"));
      await withConfirmation(cBeerWineStoreFacetProxy2.addAlcohol("Tiger"));
      await withConfirmation(cBeerWineStoreFacetProxy1.setMinAge(18));
      await withConfirmation(cBeerWineStoreFacetProxy2.setMinAge(18));

      expect(await cStoreBaseFacetProxy1.getItems()).to.eql(["Heineken","Lamb"]);
      expect(await cStoreBaseFacetProxy2.getItems()).to.eql(["Beef","Tiger"]);

      const testCases = [
        {
          signer : sig2,
          store : cBeerWineStoreFacetProxy1,
          main : cStoreBaseFacetProxy1,
          call : "buyAlcohol",
          times : 3,
          index : 1,
          age : 18
        },
        {
          signer : sig2,
          store : cMeatStoreFacetProxy1,
          main : cStoreBaseFacetProxy1,
          call : "buyMeat",
          times : 4,
          index : 2
        },
        {
          signer : sig2,
          store : cBeerWineStoreFacetProxy2,
          main : cStoreBaseFacetProxy2,
          call : "buyAlcohol",
          times : 3,
          index : 2,
          age : 18
        },
        {
          signer : sig2,
          store : cMeatStoreFacetProxy2,
          main : cStoreBaseFacetProxy2,
          call : "buyMeat",
          times : 4,
          index : 1
        },
        {
          signer : sig3,
          store : cBeerWineStoreFacetProxy1,
          main : cStoreBaseFacetProxy1,
          call : "buyAlcohol",
          times : 3,
          index : 1,
          age : 18
        },
        {
          signer : sig3,
          store : cMeatStoreFacetProxy1,
          main : cStoreBaseFacetProxy1,
          call : "buyMeat",
          times : 10,
          index : 2
        },
        {
          signer : sig3,
          store : cBeerWineStoreFacetProxy2,
          main : cStoreBaseFacetProxy2,
          call : "buyAlcohol",
          times : 7,
          index : 2,
          age : 18
        },
        {
          signer : sig3,
          store : cMeatStoreFacetProxy2,
          main : cStoreBaseFacetProxy2,
          call : "buyMeat",
          times : 5,
          index : 1
        },
      ]

      for ( e of testCases) {
        for (let t = 0 ; t < e.times ; t++) {
          if(e.age) await e.store.connect(e.signer)[e.call](e.index,e.age);
          else await e.store.connect(e.signer)[e.call](e.index)
        }
      }

      for ( e of testCases) {
        expect(await e.main['getItemsSoldToUser'](e.signer.address,e.index)).to.equal(e.times);
      }

      await withConfirmation(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: ethers.constants.AddressZero,
              action: FacetCutAction.Remove,
              functionSelectors: getSelectors(cBeerWineStoreFacet).remove(['buyAlcohol(uint256,uint256)']),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );

      //this should fail because a previous function has been named
      
      await expect(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: cPharmacyWineFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cPharmacyWineFacet)
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      ).to.be.reverted;

      const deleted = ['addAlcohol(string)','setMinAge(uint256)','getBeerStoreItems()'];

      await withConfirmation(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: ethers.constants.AddressZero,
              action: FacetCutAction.Remove,
              functionSelectors: getSelectors(cBeerWineStoreFacet).remove(deleted),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );

      //No More BeerStore
      await expect(cBeerWineStoreFacetProxy2.addAlcohol('Heineken')).to.be.reverted

      await withConfirmation(
        cDiamondCutFacet2.diamondCut(
          [
            {
              facetAddress: cPharmacyWineFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(cPharmacyWineFacet),
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );

      await cPharmacyWineFacetProxy2.addAlcohol('Heineken');
      const storeItems = await cStoreBaseFacetProxy1.getAddr();
      console.log(storeItems, cStoreBaseFacetProxy1.address);
    })
  });
});
