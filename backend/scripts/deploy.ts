import { ethers } from "hardhat";

async function main() {

  const Kimberlite = await ethers.getContractFactory("Kimberlite");
  const kimberlite = await Kimberlite.deploy();

  await kimberlite.deployed();

  console.log(`Kimberlite deployed to ${kimberlite.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
