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
    },
    etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY,
    },
    xdeploy: {
        contract: "Kimberlite",
        constructorArgsPath: undefined, //"./scripts/kimpberlite-deploy-args.ts",
        salt: "Kimberlite_1.0",
        signer: process.env.DEPLOY_PRIVATE_KEY,
        networks: ["hardhat", "polygon"],
        rpcUrls: ["hardhat", process.env.ALCHEMY_URL],
        gasLimit: undefined,
    },
};

export default config;
