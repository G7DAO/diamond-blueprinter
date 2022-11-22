pragma solidity ^0.8.0;

// import basic store lib
import {LibStore} from "../libraries/LibOthers.sol";
// import to be able to interact with MeatStoreFacet
import {LibMeatStore} from "../libraries/LibOthers.sol";
// import to be able to interact with "enforcecontractowner"
import {LibDiamond} from "../libraries/LibDiamond.sol"; 

// i want to add a new facets that inherits from BeerWineStore 
import {BeerWineStoreFacet} from "./BeerWineStoreFacet.sol";

// i want to add new Lib functions for this facet
import {LibPharmacyWineFacet} from "../libraries/LibOthers.sol"; 

// will inherit functions from BeerWineStoreFacet
contract PharmacyWineFacet is BeerWineStoreFacet{

    function addMedicine(string memory _newMedicine) external {
        LibDiamond.enforceIsContractOwner();
        LibStore.addItem(_newMedicine,address(this));
    }

    function buyMedicine(uint256 _idx, bool hasPrescription) external {
        LibPharmacyWineFacet.enforcePrescription(hasPrescription);
        LibStore.buyItem(_idx,address(this));
    }
}