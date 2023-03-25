import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomiclabs/hardhat-etherscan");
import "xdeployer";
require('dotenv').config();


const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true
            },
        }
    },
    networks: {
        polygon: {
            url: process.env.ALCHEMY_URL,
            accounts: {
                mnemonic: process.env.MNEMONIC_MAINNET,
            },
        },
        mantle_testnet: {
            chainId: 5001,
            url: "https://rpc.testnet.mantle.xyz/",
            accounts: [ process.env.PRIVATEKEY_MANTLE_TESTNET ?? "undefined" ],
        },
    },
    etherscan: {
        apiKey: {
            polygon: process.env.POLYGONSCAN_API_KEY,
            mantle_testnet: 'your API key'
        },
        customChains: [
            {
              network: "mantle_testnet",
              chainId: 5001,
              urls: {
                apiURL: "https://explorer.testnet.mantle.xyz/api",
                browserURL: "https://explorer.testnet.mantle.xyz"
              }
            }
          ]
    },
    xdeploy: {
        contract: "Kimberlite",
        constructorArgsPath: undefined,
        salt: "Kimberlite_1.0",
        signer: process.env.DEPLOY_PRIVATE_KEY,
        networks: ["hardhat", "polygon", "mantle_testnet"],
        rpcUrls: ["hardhat", process.env.ALCHEMY_URL, "https://rpc.testnet.mantle.xyz/"],
        gasLimit: undefined,
    },
};

export default config;
