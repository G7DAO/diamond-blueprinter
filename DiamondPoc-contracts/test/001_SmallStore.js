const { expect } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");
const { defaultFixture } = require("./_fixture");
const {
  loadFixture,
  diamondName,
  getSelectors,
  FacetCutAction,
} = require("../utils/helpers");
const { parseUnits } = require("ethers/lib/utils");
const { withConfirmation } = require("../utils/deploy");

if (!diamondName || diamondName != "SmallStore") {
  return;
}

describe("Diamond 1 : Small Store", async () => {
  describe("Meat Store Facet", async () => {
    it("has more than one facet", async () => {
      let { cDiamondLoupeFacet } = await loadFixture(defaultFixture);
      let addresses = [];
      for (const address of await cDiamondLoupeFacet.facetAddresses()) {
        addresses.push(address);
      }
      expect(addresses.length).to.be.greaterThan(0);
    });

    it("should add MeatStoreFacet functions", async () => {
      let { cDiamondCutFacet, cMeatStoreFacet, cDiamondLoupeFacet } =
        await loadFixture(defaultFixture);
      const selectors = getSelectors(cMeatStoreFacet); // selectors of this facet
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
          [
            {
              facetAddress: cMeatStoreFacet.address,
              action: FacetCutAction.Add,
              functionSelectors: selectors,
            },
          ],
          ethers.constants.AddressZero,
          "0x",
          { gasLimit: 800000 }
        )
      );

      const _selectors = await cDiamondLoupeFacet.facetFunctionSelectors(
        cMeatStoreFacet.address
      );
      expect(_selectors.slice(0, 2)).to.eql(selectors.slice(0, 2));
    });

    it("should fail to add butcher name if not owner", async () => {
      let { cMeatStoreFacetProxy, cMeatStoreFacet, cDiamondCutFacet, sig2 } =
        await loadFixture(defaultFixture);
      const { deployerAddr } = await getNamedAccounts();
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
      await expect(cMeatStoreFacetProxy.connect(sig2).setButcherName("Konrad"))
        .to.be.reverted;
    });

    it("should add butcher name", async () => {
      let { cMeatStoreFacetProxy, cMeatStoreFacet, cDiamondCutFacet, sig2 } =
        await loadFixture(defaultFixture);
      const { deployerAddr } = await getNamedAccounts();
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
      await expect(cMeatStoreFacetProxy.connect(sig2).setButcherName("Konrad"))
        .to.be.reverted;
    });

    it("should change butcher name", async () => {
      let { cMeatStoreFacetProxy, cMeatStoreFacet, cDiamondCutFacet } =
        await loadFixture(defaultFixture);
      const { deployerAddr } = await getNamedAccounts();
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
      await withConfirmation(cMeatStoreFacetProxy.setButcherName("Konrad"));
      expect(await cMeatStoreFacetProxy.getButcherName()).to.be.equal("Konrad");
    });

    it("should add meat to meat store", async () => {
      let { cMeatStoreFacetProxy, cMeatStoreFacet, cDiamondCutFacet } =
        await loadFixture(defaultFixture);
      const { deployerAddr } = await getNamedAccounts();
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
      await withConfirmation(cMeatStoreFacetProxy.setButcherName("Konrad"));
      await withConfirmation(cMeatStoreFacetProxy.addMeat("Lamb"));
      const meatList = await cMeatStoreFacetProxy.getStoreItems();
      expect(meatList).to.be.eql(["Lamb"]);
    });

    it("should fail to add to meat store if not owner", async () => {
      let { cMeatStoreFacetProxy, cMeatStoreFacet, cDiamondCutFacet, sig2 } =
        await loadFixture(defaultFixture);
      const { deployerAddr } = await getNamedAccounts();
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
      await withConfirmation(cMeatStoreFacetProxy.setButcherName("Konrad"));
      await expect(
        withConfirmation(cMeatStoreFacetProxy.connect(sig2).addMeat("Lamb"))
      ).to.be.reverted;
    });

    it("should allow user to purchase", async () => {
      let {
        cMeatStoreFacetProxy,
        cMeatStoreFacet,
        cDiamondCutFacet,
        cStoreBaseFacetProxy,
        cStoreBaseFacet,
        sig2,
      } = await loadFixture(defaultFixture);
      const { deployerAddr } = await getNamedAccounts();
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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
      await withConfirmation(cMeatStoreFacetProxy.setButcherName("Konrad"));
      await withConfirmation(cMeatStoreFacetProxy.addMeat("Lamb"));
      await withConfirmation(cMeatStoreFacetProxy.connect(sig2).buyMeat(1));

      const userBalance = await cStoreBaseFacetProxy.getSalesPerItem(1);
      expect(userBalance).to.be.equal(1);
    });
  });
  describe("Beer Wine Store Facet", async () => {
    it("should add beer to store", async () => {
      let {
        cDiamondCutFacet,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy,
        cStoreBaseFacet,
        cStoreBaseFacetProxy,
      } = await loadFixture(defaultFixture);
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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

      await withConfirmation(cBeerWineStoreFacetProxy.addAlcohol("Heineken"));
      const nItems = await cStoreBaseFacetProxy.getItemCount();
      expect(nItems).to.equal(1);
    });

    it("should buy alcohol for user over 18", async () => {
      let {
        cDiamondCutFacet,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy,
        sig2,
        cStoreBaseFacet,
        cStoreBaseFacetProxy,
      } = await loadFixture(defaultFixture);
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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

      await withConfirmation(cBeerWineStoreFacetProxy.setMinAge(18));
      await withConfirmation(cBeerWineStoreFacetProxy.addAlcohol("Heineken"));
      await withConfirmation(
        cBeerWineStoreFacetProxy.connect(sig2).buyAlcohol(1, 18)
      );
      const balance = await cStoreBaseFacetProxy.getItemsSoldToUser(
        sig2.address,
        1
      );
      expect(balance).to.be.equal(1);
    });

    it("should fail to buy alcohol for user below 18", async () => {
      let {
        cDiamondCutFacet,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy,
        sig2,
        cStoreBaseFacet,
        cStoreBaseFacetProxy,
      } = await loadFixture(defaultFixture);
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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
      await withConfirmation(cBeerWineStoreFacetProxy.setMinAge(18));
      await withConfirmation(cBeerWineStoreFacetProxy.addAlcohol("Heineken"));
      await expect(cBeerWineStoreFacetProxy.connect(sig2).buyAlcohol(1, 17)).to
        .be.reverted;
    });
  });
  describe("Beer Wine store Facet & Meat store facet", async () => {
    it("should update total count after adding from both stores", async () => {
      let {
        cDiamondCutFacet,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy,
        cMeatStoreFacet,
        cMeatStoreFacetProxy,
        sig2,
        cStoreBaseFacet,
        cStoreBaseFacetProxy,
      } = await loadFixture(defaultFixture);
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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
      await withConfirmation(cBeerWineStoreFacetProxy.setMinAge(18));
      await withConfirmation(cBeerWineStoreFacetProxy.addAlcohol("Heineken"));
      await withConfirmation(cMeatStoreFacetProxy.addMeat("Lamb"));
      await withConfirmation(cMeatStoreFacetProxy.setButcherName("Konrad"));

      const totalItems = await cStoreBaseFacetProxy.getItemCount();
      const itemList = await cStoreBaseFacetProxy.getItems();
      expect(totalItems).to.be.equal(2);
      expect(itemList).to.eql(["Heineken","Lamb"]);
    });
    it("should update total balance of user after buying from both stores", async () => {
      let {
        cDiamondCutFacet,
        cBeerWineStoreFacet,
        cBeerWineStoreFacetProxy,
        cMeatStoreFacet,
        cMeatStoreFacetProxy,
        sig2,sig3,
        cStoreBaseFacet,
        cStoreBaseFacetProxy,
      } = await loadFixture(defaultFixture);
      await withConfirmation(
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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
        cDiamondCutFacet.diamondCut(
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

      const testCases = [
        {
          signer : sig2,
          items : [1,2,1,1,1]
        },
        {
          signer : sig3,
          items : [1,1,1,1,2]
        }
      ]
      await withConfirmation(cBeerWineStoreFacetProxy.setMinAge(18));
      await withConfirmation(cBeerWineStoreFacetProxy.addAlcohol("Heineken"));
      await withConfirmation(cMeatStoreFacetProxy.addMeat("Lamb"));
      await withConfirmation(cMeatStoreFacetProxy.setButcherName("Konrad"));

      for ( e of testCases ){
        for ( i of e.items ){
          if(i == 2) {
            await withConfirmation(cBeerWineStoreFacetProxy.connect(e.signer).buyAlcohol(2,18))
          }else {
            await withConfirmation(cMeatStoreFacetProxy.connect(e.signer).buyMeat(1))
          }
        }
      }

      expect(await cStoreBaseFacetProxy.getSalesPerItem(1)).to.be.equal(8);
      expect(await cStoreBaseFacetProxy.getSalesPerItem(2)).to.be.equal(2);

      for ( e of testCases) {
        let items1 = 0;
        let items2 = 0;
        for ( i of e.items) {
          if (i == 1) items1++
          else items2++
        }
        expect(await cStoreBaseFacetProxy.getItemsSoldToUser(e.signer.address,1)).to.be.equal(items1);
        expect(await cStoreBaseFacetProxy.getItemsSoldToUser(e.signer.address,2)).to.be.equal(items2);
      }



    });
  });
});
