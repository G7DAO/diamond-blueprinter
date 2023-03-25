import { ethers } from "hardhat";
async function extract(kimberliteAddress :string) {

    console.log('Extract')
    const factory = await ethers.getContractFactory("Kimberlite")
    const contract = await factory.attach(kimberliteAddress)
    await contract.extractDiamond("https://arweave.net/5S1NrCPfLJX7FgRx78kV8nDJCnwFkWRKSc18pDdD4Sw")
}

extract("0x306DD94AdEc5D88383065C237Ed1958687Be4daf")
