import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();
//require("@nomiclabs/hardhat-ethers");
//require("@nomiclabs/hardhat-etherscan");

const config: HardhatUserConfig = {
    solidity: "0.8.18",
    networks: {
        polygon: {
            url: process.env.ALCHEMY_URL,
            accounts: {
                mnemonic: process.env.MNEMONIC_MAINNET,
            },
        },
    }
};

export default config;
