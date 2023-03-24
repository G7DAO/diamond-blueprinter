import { ethers } from "hardhat";
import { BaseContract } from "ethers";
import fs from 'fs/promises';


// this constants are used to describe metadata
// ATTN! Please change them before running deploy script
const GROUP = "Characters"
const NAME = "TrivialCharacterSystem"
const STORAGEKEY = "smashcraft.character.storage"
const STORAGECONTETS  = `
  struct AliveState {
    mapping(uint256 => bool) alive;
  }
`

async function deploySystem(systemName: string): Promise<BaseContract> {
  const System = await ethers.getContractFactory(systemName)
  console.log('Deploying ' + systemName)
  const system = await System.deploy()
  console.log(`${systemName} deployed to ${system.address}, ${Object.keys(system)}`);

  //save deploy result
  let resultJson = {
    address: system.address,
    explorer_url : `https://polygonscan.com/address/${system.address}#code`,
    name: NAME,
    group: GROUP,
    [STORAGEKEY]: STORAGECONTETS
  }

  await fs.writeFile(
    'cache/registry_metadata_saved.json',
    JSON.stringify(resultJson, null, 4)
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
