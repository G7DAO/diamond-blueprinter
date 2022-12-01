async function getTxOpts(gasLimit = null) {
    let txOpts = {};
    if (gasLimit) {
      txOpts.gasLimit = gasLimit;
    }
    if (process.env.GAS_PRICE_MULTIPLIER) {
      const gasPrice = await premiumGasPrice(process.env.GAS_PRICE_MULTIPLIER);
      txOpts.gasPrice = gasPrice;
    }
  }
  
  module.exports = {
    getTxOpts,
  };
  