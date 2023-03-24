import { ethers } from "hardhat";
import {BaseContract} from "ethers";

async function deploySystem(systemName: string): Promise<BaseContract> {
  const System = await ethers.getContractFactory(systemName)
  console.log('Deploying ' + systemName)
  const system = await System.deploy()
  console.log(`${systemName} deployed to ${system.address}`);
  return system
}

if (require.main === module) {
  deploySystem("TrivialCharacterSystem")
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deploySystem = deploySystem
