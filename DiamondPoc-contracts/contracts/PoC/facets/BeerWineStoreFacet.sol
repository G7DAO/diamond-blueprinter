pragma solidity ^0.8.0;

// import base lib for Store
import {LibStore} from "../libraries/LibOthers.sol";
// import to be able to interact with MeatStoreFacet
import {LibBeerWineStore} from "../libraries/LibOthers.sol";
// import to be able to interact with "enforcecontractowner"
import {LibDiamond} from "../libraries/LibDiamond.sol"; 
// import counter as we using their library
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";


contract BeerWineStoreFacet {

    using Counters for Counters.Counter;

    event AlcoholAdded(uint256 idx, string name);

    function addAlcohol(string memory _newBeer) external {
        LibDiamond.enforceIsContractOwner();
        LibStore.addItem(_newBeer,address(this));
    }

    function buyAlcohol(uint256 _idx, uint256 age) external {
        LibBeerWineStore.enforceMinAge(age);
        LibStore.buyItem(_idx,address(this));
    } 

    function setMinAge(uint256 _minAge) external {
        LibBeerWineStore.diamondStorage().minAge = _minAge;
    }
    function getBeerStoreItems() external view returns (string[] memory itemList){
        itemList = LibStore.getItemsPerStore(address(this));
    }
}