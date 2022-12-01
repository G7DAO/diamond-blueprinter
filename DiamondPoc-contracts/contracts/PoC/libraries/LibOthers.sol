pragma solidity ^0.8.0;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

library LibStore {

    using Counters for Counters.Counter;
    error ItemNotSoldAtStore();
    error ItemNotAvailable();
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.store");
    

    struct StoreState {

        Counters.Counter itemCounter;
        mapping(uint256 => string) productName;
        mapping(uint256 => bool) isProductAvailable;
        mapping(uint256 => address) productStore; // maps prodcut to allowed store
        mapping(uint256 => uint256) salesPerProduct;
        mapping(address => mapping(uint256 => uint256)) itemSalesPerCustomer;
        mapping(address => uint256) salesPerCustomer;
    }

    function diamondStorage() internal pure returns (StoreState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function  isStoreOfProduct(address store, uint256 _idx) internal view  {
        if(store != diamondStorage().productStore[_idx]){
            revert ItemNotSoldAtStore();
        }        
    }

    function isProductAvailable(uint256 _idx) internal view {
        if(!diamondStorage().isProductAvailable[_idx]){
            revert ItemNotAvailable();
        }
    }

    function getItemsPerStore(address storeAddr) internal view returns (string[] memory itemList){
        StoreState storage ds = diamondStorage();
        uint256 nItems = ds.itemCounter.current();
        itemList = new string[](nItems);
        uint256 i = 0;
        for(uint256 itemIndex = 1 ; itemIndex <= nItems ; itemIndex ++){
            if(storeAddr == address(0) || (ds.isProductAvailable[itemIndex] && ds.productStore[itemIndex] == storeAddr)){
                itemList[i]= ds.productName[itemIndex];
                i++;
            }
        }
    }

    function buyItem (uint256 _idx, address storeAddr) internal {
        isStoreOfProduct(storeAddr,_idx);
        isProductAvailable(_idx);
        StoreState storage  ds = diamondStorage();
        ds.salesPerProduct[_idx]++;
        ds.itemSalesPerCustomer[msg.sender][_idx]++;
        ds.salesPerCustomer[msg.sender]++;
    }

    function addItem (string memory itemName, address storeAddr) internal {
        StoreState storage ds = diamondStorage();
        ds.itemCounter.increment();
        ds.productName[ds.itemCounter.current()] = itemName;
        ds.productStore[ds.itemCounter.current()] = storeAddr;
        ds.isProductAvailable[ds.itemCounter.current()] = true;
    }
}

library LibMeatStore {

  bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.meat");
  struct StoreState {
      string butcherName;
  }

  function diamondStorage() internal pure returns (StoreState storage ds) {
      bytes32 position = DIAMOND_STORAGE_POSITION;
      assembly {
          ds.slot := position
      }
  }

  function setButcherName (string memory _butcherName) internal {
    StoreState storage storeState = diamondStorage();
    storeState.butcherName = _butcherName;
  }

  function getButcherName() internal view returns (string memory) {
    StoreState storage storeState = diamondStorage();
    return storeState.butcherName;
  }

}

library LibBeerWineStore {

  error UnderageCustomer();  

  bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.beer");
  struct StoreState {
      uint256 minAge;
  }

  function diamondStorage() internal pure returns (StoreState storage ds) {
      bytes32 position = DIAMOND_STORAGE_POSITION;
      assembly {
          ds.slot := position
      }
  }

  function setMinAge (uint256 _minAge) internal {
    StoreState storage storeState = diamondStorage();
    storeState.minAge = _minAge;
  }

  function getMinAge() internal view returns (uint256) {
    StoreState storage storeState = diamondStorage();
    return storeState.minAge;
  }

  function enforceMinAge(uint256 age) internal view {
    if(age < diamondStorage().minAge){
        revert UnderageCustomer();
    }    
  }


}

library LibPharmacyWineFacet {

  error UnderageCustomer();  

  bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.beer");
  struct StoreState {
      bool needPrescription;
  }

  function diamondStorage() internal pure returns (StoreState storage ds) {
      bytes32 position = DIAMOND_STORAGE_POSITION;
      assembly {
          ds.slot := position
      }
  }

  function setNeedPrescription (bool _need) internal {
    StoreState storage storeState = diamondStorage();
    storeState.needPrescription = _need;
  }


  function enforcePrescription(bool hasPrescription) internal view {
    if(diamondStorage().needPrescription && !hasPrescription){
        revert UnderageCustomer();
    }    
  }


}