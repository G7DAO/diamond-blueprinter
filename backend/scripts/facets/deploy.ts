import { ethers } from "hardhat";
import { BaseContract } from "ethers";
import fs from 'fs/promises';

const groupName = "Characters"
const systemName = "TrivialCharacterSystem"
const storageKey = "character.storage"
const storageContents  = `struct AliveState {
    mapping(uint256 => bool) alive;
  }

  function diamondStorage() internal pure returns (AliveState storage ds) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
        ds.slot := position
    }
  }

  function _isAlive(uint256 id) internal view returns (bool){
    AliveState storage state = diamondStorage();
    return state.alive[id];
  }`

async function deploySystem(systemName: string): Promise<BaseContract> {
  const System = await ethers.getContractFactory(systemName)
  console.log('Deploying ' + systemName)
  const system = await System.deploy()
  console.log(`${systemName} deployed to ${system.address}, ${Object.keys(system)}`);

  //save deploy result
  let resultJson = {
    address: system.address,
    explorer_url : `https://polygonscan.com/address/${system.address}#code`,
    name: systemName,
    group: groupName,
    [storageKey]: storageContents
  }

  await fs.writeFile(
    'cache/registry_metadata_saved.json',
    JSON.stringify(resultJson)
  );

  return system
}



if (require.main === module) {
  deploySystem(systemName)
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deploySystem = deploySystem
