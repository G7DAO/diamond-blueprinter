// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "../interfaces/sample-facets/ICharactersSystem.sol";
import "./CharactersStorage.sol";

contract SimpleCharactersSystem is ICharactersSystem {

    function init() external {
        CharactersStorage._spawn(uint256(uint160(msg.sender)));
    }


    function whatIs(uint256 id) external view virtual returns (uint256 character){
        if (CharactersStorage._isAlive(id))
            character = id;
    }

    function isAlive(uint256 id) external view virtual returns (bool){
        return CharactersStorage._isAlive(id);
    }
}
