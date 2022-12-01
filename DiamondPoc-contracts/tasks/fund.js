const { getBestHolderSigner } = require("../utils/funding");
const { parseUnits } = require("ethers").utils;

const { decimals } = require("../utils/constants");

const ERC20_ABI = require("../utils/abis/ERC20.json");

const { addresses } = require("../utils/addresses");

async function fund(taskArguments, hre) {
  const accountsToFund = process.env.ACCOUNTS_TO_FUND.split(",");
  const tokensToFund = process.env.TOKENS_FUND.split(",");
  const firstLocalAcountsToFund = parseInt(taskArguments.localaccounts);
  const fundNetwork = taskArguments.fundnetwork;
  const amountToFund = taskArguments.amount;

  const localSigners = (await hre.ethers.getSigners())
    .slice(0, firstLocalAcountsToFund)
    .map((item) => {
      return item.address;
    });

  accountsToFund.push(...localSigners);

  const TokenList = [];

  for (let i = 0; i < tokensToFund.length; i++) {
    let token =
      tokensToFund[i] == "ETH"
        ? {
            name: "ETH",
            contract: null,
            decimals: decimals[fundNetwork]["DEFAULT"],
            forkSigner: await getBestHolderSigner("ETH", fundNetwork, hre),
          }
        : {
            name: tokensToFund[i],
            contract: await hre.ethers.getContractAt(
              ERC20_ABI,
              addresses[fundNetwork][tokensToFund[i]]
            ),
            decimals:
              decimals[fundNetwork][tokensToFund[i]] ||
              decimals[fundNetwork]["DEFAULT"],
            forkSigner: await getBestHolderSigner(
              tokensToFund[i],
              fundNetwork,
              hre
            ),
          };

    TokenList.push(token);
  }

  for (let i = 0; i < accountsToFund.length; i++) {
    const currentAccount = accountsToFund[i];
    await Promise.all(
      TokenList.map(async (contractData) => {
        const { contract, decimals, forkSigner, name } = contractData;
        if (!contract) {
          await forkSigner.sendTransaction({
            to: currentAccount,
            from: forkSigner._address,
            value: hre.ethers.utils.parseEther(`${amountToFund}`),
          });
        } else {
          await contract
            .connect(forkSigner)
            .transfer(currentAccount, parseUnits(amountToFund, decimals));
        }
        console.log(
          `Funded ${currentAccount} with ${amountToFund} ${name.toUpperCase()}`
        );
      })
    );
  }
}

module.exports = {
  fund,
};
