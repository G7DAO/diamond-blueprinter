pragma solidity ^0.8.0;

// import basic store lib
import {LibStore} from "../libraries/LibOthers.sol";
// import to be able to interact with MeatStoreFacet
import {LibMeatStore} from "../libraries/LibOthers.sol";
// import to be able to interact with "enforcecontractowner"
import {LibDiamond} from "../libraries/LibDiamond.sol"; 
// import some contracts we want to read functions from
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract MeatStoreFacet {

    event meatAdded(uint256 idx, string name);
    event meatRemoved(uint256 idx);
    using Counters for Counters.Counter;

    function setButcherName (string memory _newButcherName) external {
        LibDiamond.enforceIsContractOwner();
        LibMeatStore.setButcherName(_newButcherName);
    }   
    function getButcherName() external view returns (string memory _butcherName) {
        _butcherName = LibMeatStore.getButcherName();
    }
    function buyMeat(uint256 _idx) external {
        LibStore.buyItem(_idx,address(this));
    }
    function addMeat(string memory _newMeat) external {
        LibDiamond.enforceIsContractOwner();
        LibStore.addItem(_newMeat, address(this));
    }

    function removeMeat(uint256 _idx) external {
        LibDiamond.enforceIsContractOwner();
        LibStore.StoreState storage ds = LibStore.diamondStorage();
        ds.isProductAvailable[_idx] = false;
        emit meatRemoved(_idx);

    }

    function getStoreItems() external view returns (string[] memory itemList){
        itemList = LibStore.getItemsPerStore(address(this));
    }

}