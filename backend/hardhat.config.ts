import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "xdeployer";
require('dotenv').config();

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        polygon: {
            url: process.env.ALCHEMY_URL,
            accounts: {
                mnemonic: process.env.MNEMONIC_MAINNET,
            },
        },
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
