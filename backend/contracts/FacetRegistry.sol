// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IRegistry.sol";

contract FacetRegistry is ERC1155, IRegistry {
    uint256 constant baseTokenDiamond = 1 << 250;
    uint256 constant baseTokenStorage = 2 << 250;
    uint256 constant baseTokenFacetAddress = 3 << 250;

    mapping(uint256 => bytes) public metadata;

    constructor() ERC1155("") {}

    function mintDiamond(address addr, address to, string memory meta) external {
        _mint(to, _diamondAddressToTokenId(addr), 1, bytes(meta));
    }

    function mintStorage(string memory storageSlot, string memory meta) external {
        //TODO nice to have, let's see how it goes
    }

    function createFacetAddress(address addr, string memory meta) external {
        uint256 id = _facetAddressToTokenId(addr);
        require(!_exists(id), "FacetRegistry: facet address already known");
        _mint(msg.sender, id, 1, bytes(meta)); //mint one to the facet deployer
    }

    /**
        @notice mint to a Diamond to mark a particular facet as usable by a particular project
        @notice every pre-existing sample facet is minted to `FacetRegistry` itself
    */
    function mintFacet(address facetAddr, address to) external {
        uint256 id = _facetAddressToTokenId(facetAddr);
        require(!_exists(id), "FacetRegistry: facet address already known");
        _mint(to, id, 1, "0x");
    }


    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        return string(metadata[tokenId]); //TODO switch to ERC1155URIStorage.sol
    }

    function tokenType(uint256 tokenId) external pure returns (TokenType){
        if (_isDiamond(tokenId)) {
            return TokenType.Diamond;
        }
        if (_isStorage(tokenId)) {
            return TokenType.DiamondStorage;
        }
        return TokenType.Facet;
    }

    function _beforeTokenTransfer(
        address,
        address from,
        address,
        uint256[] memory ids,
        uint256[] memory,
        bytes memory data
    ) internal virtual override {
        uint256 id = ids[0]; //TODO update for multiple token transfers
        if (from == address(0) && metadata[id].length == 0 && data.length > 0) {
            metadata[id] = data;
        }
    }

    function _exists(uint256 tokenId) private view returns (bool){
        return metadata[tokenId].length > 0;
    }

    function _isDiamond(uint256 tokenId) private pure returns (bool){
        return tokenId >= baseTokenDiamond && tokenId < baseTokenStorage;
    }

    function _isStorage(uint256 tokenId) private pure returns (bool){
        return tokenId >= baseTokenStorage && tokenId < baseTokenFacetAddress;
    }

    function _isFacet(uint256 tokenId) private pure returns (bool){
        return tokenId >= baseTokenFacetAddress;
    }

    function _facetAddressToTokenId(address facetAddress) private pure returns (uint256){
        return baseTokenFacetAddress + uint256(uint160(facetAddress));
    }

    function _diamondAddressToTokenId(address diamondAddress) private pure returns (uint256){
        return baseTokenDiamond + uint256(uint160(diamondAddress));
    }

}
