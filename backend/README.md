
## Polygon
* [Kimberlite](https://polygonscan.com/address/0x4ccbf299779e9cea944e9f15891fb9ad1f0a4a03)


## Verify freshly deployed Diamond with Hardhat
```shell
cat args.js
```

```javascript
module.exports = [
  [],
  {
        owner: "0x5Ce2D6FDb0548234c376348aaB6463378b7B7af3",
        init:  "0x0000000000000000000000000000000000000000",
        initCalldata: "0x"
  },
];
```

```shell
npx hardhat verify 0xb1fd98e33dcdb5f11b5a046a00b2bb494aa217b3 --constructor-args args.js  --network polygon
```
