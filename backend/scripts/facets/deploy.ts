import { ethers } from "hardhat";
import { BaseContract } from "ethers";
import fs from 'fs/promises';
import path from 'path';
import Arweave from 'arweave';
//import jwk_data from './../../cache/arweave-keyfile.json'

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

  // 1. Deploy contract with ethers and hardhat

  const System = await ethers.getContractFactory(systemName)
  const system = await System.deploy()
  console.log(`${systemName} deployed to ${system.address}, ${Object.keys(system)}`);

  // TODO determine the network





  // 2. the resulting metadata of deployed contract is saved locally
  let resultJson = {
    address: system.address,
    explorer_url : `https://polygonscan.com/address/${system.address}#code`,
    name: systemName,
    group: groupName,
    [storageKey]: storageContents
  }


  await fs.writeFile(
    'cache/registry_metadata_saved.json',
    JSON.stringify(resultJson, null, 4)
  );




  
  // 3. the resulting metadata of deployed contract is saved to public decentralized storage
  // here we've got arweave
  
  // NB!  This is an example of saving meta to decentralized storage.
  // To make this demo working, we've put a real jwk file into project
  // Please, make your own arweave wallet and jwk file
  //
  // For more details visit
  // https://www.arweave.org/
  // https://github.com/ArweaveTeam/arweave-js/blob/master/README.md

  const ROOT_PATH_ARWEAVE_JWK = './arweave-keyfile.json';

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  const jwk_data = await import(path.resolve(process.cwd(), ROOT_PATH_ARWEAVE_JWK));


  let transactionA = await arweave.createTransaction({
      data: JSON.stringify(resultJson, null, 4)
  }, jwk_data);

  await arweave.transactions.sign(transactionA, jwk_data);

  // waiting for arweave uploader to finish
  let uploader = await arweave.transactions.getUploader(transactionA);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
  }

  //TODO  get public url of result
  
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
