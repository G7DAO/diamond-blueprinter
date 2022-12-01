pragma solidity ^0.8.0;

// import basic store lib
import {LibStore} from "../libraries/LibOthers.sol";
// import to be able to interact with "enforcecontractowner"
import {LibDiamond} from "../libraries/LibDiamond.sol"; 
// import some contracts we want to read functions from
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract StoreBaseFacet {

    using Counters for Counters.Counter;

    function getItemCount() external view returns (uint256 count){
        count = LibStore.diamondStorage().itemCounter.current();
    }

    function getItems() external view returns (string[] memory itemList){
        itemList = LibStore.getItemsPerStore(address(0));
    }

    function getItemsSoldToUser (address _customer, uint256 _idx) external view returns (uint256 itemCount) {
        itemCount = LibStore.diamondStorage().itemSalesPerCustomer[_customer][_idx];
    }

    function getSalesPerItem (uint256 _idx) external view returns (uint256 itemCount) {
        itemCount = LibStore.diamondStorage().salesPerProduct[_idx];
        return itemCount;
    }

    function getAddr() external view returns(address myAddr){
        myAddr = address(this);
    }
}