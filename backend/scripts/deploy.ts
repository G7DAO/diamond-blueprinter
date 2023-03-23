import { ethers } from "hardhat";
import {BaseContract} from "ethers";

async function deployKimberlite(): BaseContract {

  const Kimberlite = await ethers.getContractFactory("Kimberlite");
  const kimberlite = await Kimberlite.deploy();

  await kimberlite.deployed();

  console.log(`Kimberlite deployed to ${kimberlite.address}`);
  return kimberlite
}

if (require.main === module) {
  deployKimberlite()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployKimberlite = deployKimberlite
