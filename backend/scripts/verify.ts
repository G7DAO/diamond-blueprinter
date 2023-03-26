import hre from "hardhat"

export async function verify(address: string, constructorArguments: any[]) {
  console.log("Network name", hre.network.name)
  if (hre.network.name == 'hardhat') {
    return
  }
  await hre.run("verify:verify", {
    address,
    constructorArguments
  });
}

export async function getEtherscanEndpoint() {
  if (hre.network.name == 'hardhat') {
    return
  }
  return await hre.run("verify:get-etherscan-endpoint", {});
}

export async function getEtherscanEndpointOrPolygon() {
  return (await getEtherscanEndpoint()) || {
    network: 'polygon',
    urls: {
      apiURL: 'https://api.polygonscan.com/api',
      browserURL: 'https://polygonscan.com'
    }
  }
}


// verify:get-etherscan-endpoint