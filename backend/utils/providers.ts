import { Wallet, providers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const sigProviders: any = {
    "80001": new Wallet(process.env.PRIVATE_KEY!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
    "534354" : new Wallet(process.env.PRIVATE_KEY!,new providers.JsonRpcProvider(process.env.SCROLL_RPC!)),
  
};
  
const Providers : any = {
    "80001" : new providers.JsonRpcProvider(process.env.MUMBAI_RPC!),
    "534354" :new providers.JsonRpcProvider(process.env.SCROLL_RPC!)
}

export {
    Providers,
    sigProviders
}