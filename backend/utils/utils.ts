import { ethers, providers, utils, Wallet, Contract } from "ethers";
import fetch from "node-fetch";
import { diamondCutABI, DiamondLoupeFacetABI } from "./abis";
const solc = require("solc");
import { MongoClient } from "mongodb";
import { Providers , sigProviders} from "./providers";

const START_BLOCK = 29240066;
const UPDATETOPIC = "0x8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb673";

function getTimestamp() {
  return Math.floor(+new Date() / 1000);
}

async function awaitAndFilter(requests: any[]) {
  let result = (await Promise.allSettled(requests))
    .filter((res) => res.status === "fulfilled")
    .map((res: any) => res.value);
  return result;
}

function mergeListIntoDictionary(list: any[]): any {
  const container: any = {};
  for (let item of list) {
    const keys: string[] = Object.keys(item);
    if (keys.length !== 1) {
      console.log(
        `${JSON.stringify(
          item
        )} cannot be merged as one or more elements contain more than 1 keys.`
      );
      continue;
    }
    const key: string = keys[0];
    container[key] = item[key];
  }
  return container;
}

function compileSolidityCode(name: any, src: any) {
  let input = {
    language: "Solidity",
    sources: {
      "test.sol": {
        content: src,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  // `output` here contains the JSON output as specified in the documentation
  // for (var contractName in output.contracts['test.sol']) {
  // console.log(
  //     contractName +
  //     ': ' +
  //     output.contracts['test.sol'][contractName].evm.bytecode.object
  // );
  return output.contracts["test.sol"][name].abi;
}

function findTopMatches(list: any, str: any) {
  let slicedStr = str.toLowerCase().split(" ");

  let mappedList = list.map((item: any) => {
    return {
      count: 0,
      ...item,
    };
  });

  for (let item of mappedList) {
    for (let s of slicedStr) {
      item.count += (
        item.name.toLowerCase().match(new RegExp(s, "g")) || []
      ).length;
      item.count += (
        item.description.toLowerCase().match(new RegExp(s, "g")) || []
      ).length;
    }
  }

  mappedList.sort(function (a: any, b: any) {
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    return 0;
  });

  return mappedList;
}

function getSelectors(abi: any) {
  const interfaceInstance = new ethers.utils.Interface(abi);
  const signatures = Object.keys(interfaceInstance.functions);
  const selectors = signatures.reduce((acc: any, val: any) => {
    if (val !== "init(bytes)") {
      acc.push(interfaceInstance.getSighash(val));
    }
    return acc;
  }, []);
  selectors.interface = interfaceInstance;
  selectors.remove = remove;
  selectors.get = get;
  return selectors;
}

function remove(this: any, funcNames: any) {
  const selectors = this.filter((v: any) => {
    for (const functionName of funcNames) {
      if (v === this.interface.getSighash(functionName)) {
        return false;
      }
    }
    return true;
  });
  selectors.interface = this.interface;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

function get(this: any, funcNames: any) {
  const selectors = this.filter((v: any) => {
    for (const functionName of funcNames) {
      if (v === this.interface.getSighash(functionName)) {
        return true;
      }
    }
    return false;
  });
  selectors.interface = this.interface;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

function generateSelectorsData(abi : any, facetAddr : any , facetName : any) {
    const selectors = getSelectors(abi);
    const it = (new utils.Interface(abi)).functions;
    const output = [];

    for ( let f of Object.keys(it)) {
        output.push({
            selector : selectors[output.length],
            functionName : f,
            facetAddr,
            facetName
        })
    }
    return output;
}

function buildTxPayload(
  facetAbi: any,
  facetAddress: any,
  funcList: any,
  action: any,
  // diamondAddr: any,
  // provider :any,
) {

  const data = new ethers.utils.Interface(diamondCutABI).encodeFunctionData(
    "diamondCut",
    [
      [
        {
          facetAddress: action.toLowerCase() == "add" ? facetAddress : ethers.constants.AddressZero,
          action: action.toLowerCase() == "add" ? 0 : 2,
          functionSelectors: funcList
            ? getSelectors(facetAbi).get(funcList)
            : getSelectors(facetAbi),
        },
      ],
      ethers.constants.AddressZero,
      "0x",
    ]
  );
  // const tx = await sigProviders['80001'].sendTransaction({
  //   to : diamondAddr,
  //   data
  // });

  // console.log(tx);
  // await tx.wait();

    return data
}

async function parseDiamondCutArgs ( data : any, db : any) {

    let output = {};
    if(data.action == 0) {
        for(let selector of data.functionSelectors){
            let entityOption = await db.collection("selectors").findOne({selector, facetAddr : data.facetAddress })
            let entityOption2 = await db.collection("selectors").findOne({selector })
              output = {
                action : "Add",
                functionName : entityOption2 ? entityOption2.functionName : selector,
                facetAddr : entityOption? entityOption.facetAddr : data.facetAddress
            }
        }
    }else if(data.action == 2) {
        for(let selector of data.functionSelectors){
          let entityOption = await db.collection("selectors").findOne({selector, facetAddr : data.facetAddress })
          let entityOption2 = await db.collection("selectors").findOne({selector })
            output = {
                action : "Remove",
                functionName : entityOption2 ? entityOption2.functionName : selector,
                facetAddr : entityOption? entityOption.facetAddr : data.facetAddress
            } 
        }
    }else {
        for(let selector of data.functionSelectors){
          let entityOption = await db.collection("selectors").findOne({selector, facetAddr : data.facetAddress })
          let entityOption2 = await db.collection("selectors").findOne({selector })
          output = {
              action : "Replace",
              functionName : entityOption2 ? entityOption2.functionName : selector,
              facetAddr : entityOption? entityOption.facetAddr : data.facetAddress
          } 
        }
    }
    return output;
}

async function getDiamondLogs(diamondAddr : any, provider : providers.JsonRpcProvider) {

    const client = await MongoClient.connect(process.env.DATABASE_URL!,{})
    const db = client.db("facets");     

    const currBlockNum = await provider.getBlockNumber();
    const res = await fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${diamondAddr}&startblock=${START_BLOCK}&endblock=${currBlockNum}&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`);
    const data = (await res.json()).result;
    let selector = getSelectors(diamondCutABI)[0];
    // console.log(selector, data);
    // console.log(selectors)
    let result = data.filter((item : any) => {
        return item.input.slice(0,10).toLowerCase() ==  selector.toLowerCase()
    })

    let it = new utils.Interface(diamondCutABI);

    let output : any = [];

    for(let tx of result) {
        let receipt = await provider.getTransactionReceipt(tx.hash);
        let logs = receipt.logs.filter((item : any) => {
            return item.address.toLowerCase() == diamondAddr.toLowerCase()
        })
        
        for (let log of logs) {
          let info = {
            timestamp : tx.timeStamp ,
            ...(await parseDiamondCutArgs(it.parseLog(log).args[0][0],db))
          }
          // console.log(it.parseLog(log).args[0][0])
          output.push(info);
        }
    }

    return output
    
}
async function matchToFacets(facetAddr : any, selectorList : any, db : any) {
  let output = [];
  for( let selector of selectorList ) {
    let selectorEntity = await db.collection("selectors").findOne({selector,facetAddr});
    if(selectorEntity) {
      output.push(selectorEntity)
    }else {
      selectorEntity = await db.collection("selectors").findOne({selector});

      if(selectorEntity){
        output.push({
          ...selectorEntity,
        })
      }else {
        output.push({
          selector
        })
      }
    }
  }
  return output;
}
async function getDiamondFacetsAndFunctions (diamondAddr : any, chainId : any) {
    const client = await MongoClient.connect(process.env.DATABASE_URL!,{})
    const db = client.db("facets");
    const cLoupeProxy = new Contract(diamondAddr,DiamondLoupeFacetABI,Providers[chainId || '80001']);
    const readDiamondFacets = await cLoupeProxy.facets();
    let output:any = [];
    console.log(readDiamondFacets);
    for ( let facet of readDiamondFacets) {
        let facetEntity  =  await db.collection("facets").findOne({address : facet.facetAddress})
        output.push({
          facetAddr : facet.facetAddress,
          facetName : facetEntity ? facetEntity.name : "noName",
          functions : (await matchToFacets(facet.facetAddress,facet.functionSelectors,db))
        })
    }
    return output;
}


export {
  getTimestamp,
  awaitAndFilter,
  mergeListIntoDictionary,
  compileSolidityCode,
  findTopMatches,
  buildTxPayload,
  getDiamondLogs,
  generateSelectorsData,
  getDiamondFacetsAndFunctions
};
