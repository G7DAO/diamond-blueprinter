// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "../interfaces/sample-facets/ICharactersSystem.sol";
import "./CharacterSystemLibrary.sol";

contract SimpleCharactersSystem is ICharactersSystem{

    //TODO use init() in Typescript in any way possible ( deploy or tests) to enable frontend do it too
    function init() external {
        CharacterStorage._spawn(uint256(uint160(msg.sender)));
    }


    function whatIs(uint256 id) external view virtual returns (uint256 character){
        if (CharacterStorage._isAlive(id))
            character = id;
    }

    function isAlive(uint256 id) external view virtual returns (bool){
        return CharacterStorage._isAlive(id);
    }
}
