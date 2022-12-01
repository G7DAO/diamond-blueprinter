const {funders} = require('../utils/addresses');
const getBestHolderSigner = async (tokenName, networkName, hre) => {
    const bestHolder = funders[networkName][tokenName];
    const signer = await hre.ethers.provider.getSigner(bestHolder);

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [bestHolder],
    })

    return signer;
}

const getSignerForAddress = async (address, hre) => {
    const signer = await hre.ethers.provider.getSigner(address);

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [address],
    });

    return signer;
}

module.exports = {
    getBestHolderSigner,
    getSignerForAddress
}