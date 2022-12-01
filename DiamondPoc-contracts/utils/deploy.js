const hre = require("hardhat");
const { isMainnet, isTestnet,isLocalHost, isFork } = require("../utils/helpers");

const { getTxOpts } = require("../utils/tx");

const NUM_CONFIRMATIONS = isFork || isLocalHost ? 0 : 3;

function log(msg, deployResult = null) {
  if (process.env.VERBOSE) {
    if (deployResult && deployResult.receipt) {
      const gasUsed = Number(deployResult.receipt.gasUsed.toString());
      msg += ` Address: ${deployResult.address} Gas Used: ${gasUsed}`;
    }
    console.log("INFO:", msg);
  }
}

const withConfirmation = async (deployOrTransactionPromise) => {
  const result = await deployOrTransactionPromise;
  await hre.ethers.provider.waitForTransaction(
    result.receipt ? result.receipt.transactionHash : result.hash,
    NUM_CONFIRMATIONS
  );
  return result;
};
const deployWithConfirmation = async (
  contractName,
  args,
  contract,
  skipUpgradeSafety = false
) => {
  // check that upgrade doesn't corrupt the storage slots

  // if (!skipUpgradeSafety) {
  //   await assertUpgradeIsSafe(hre, contractName);
  // }

  const { deploy } = deployments;
  const { deployerAddr } = await getNamedAccounts();
  if (!args) args = null;
  if (!contract) contract = contractName;
  const result = await withConfirmation(
    deploy(contractName, {
      from: deployerAddr,
      args,
      contract,
      fieldsToCompare: null,
      ...(await getTxOpts()),
    })
  );

  // if upgrade happened on the mainnet save the new storage slot layout to the repo
  // if (isMainnet) {
  //   await storeStorageLayoutForContract(hre, contractName);
  // }

  log(`Deployed ${contractName}`, result);
  return result;
};

module.exports = {
  deployWithConfirmation,
  withConfirmation,
  log,
};
