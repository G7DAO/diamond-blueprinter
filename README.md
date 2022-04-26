# DIAMOND BLUEPRINTER

EVM Compatible Smart Contract Creator that uses Audited On-Chain EIP-2535: Diamonds, Multi-Facet Proxy
Smart Contract Facets as blueprints that developers can use to build your own EIP-2535 Smart Contracts.  

[EIP-2535: Diamonds, Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535)

## Summary
The EIP-2535 smart contracts are extensible without having to redeploy existing functionality. 
Parts of a diamond can be added / replaced / removed while leaving other parts alone. 
They can be immutable or mutable. The EIP-2535 Standard enables people to write 
smart contracts with virtually no size limit, standardizes contract interfaces and 
makes interoperability easier to achieve.

The Diamond Blueprinter dynamically creates EIP-2535 Smart Contracts using existing on-chain and audited EIP-2535 
facets. Using our plug-and-play system, you can create custom contracts that meet your exact needs using battle tested on-chain assets.

## Problem
The problem experienced by the greatest number of Web3 Developers in the development of Web3 
products as cited in the [G7 Industry Report](#) was a lack of off-the-shelf smart contracts that are 
commonly used. The contracts should be easy to find, should be queryable by 
common use cases, should be secure and should be battle tested. 

## Solution
The creation of hundreds of On-chain EIP-2535 Diamond Facets that act as battle tested
function libraries. These functions and their addresses are stored in an accessible format such as a 
database and made available to the Diamond Blueprinter. 

The Diamond Blueprinter organizes these functions as commonly used contracts that meet common use cases
yet still allows the developer to further customize the contract to meet their specific 
needs.   

### Facet
A Facet is simply an On-Chain Library of Functions.

Facets are Reusable and Composable. A deployed facet can be used by any number of diamonds.

Different combinations of facets can be used with different diamonds.

It is possible to create and deploy a set of facets that are reused by different diamonds over time.

The ability to use the same deployed facets for many diamonds reduces deployment costs.

A limitation is that two external functions with the same function signature can’t be added to a diamond at the same 
time because a diamond, or any contract, cannot have two external functions with the same function signature.

A facet defines external functions and can define or use internal functions, libraries, and state variables.

A facet can declare state variables in structs. Each struct is given a specific position in contract storage. This technique is called Diamond Storage.


## Getting Started
The prototype will consist of the following functionality:
* **50 (on-chain) EIP-2535 Diamond Facets** that contain commonly used, battle tested functions that would be useful for creating a prototype.
* **Testing Suite** for facets. Incorporate the [Bugout Facet Inspector](https://github.com/bugout-dev/inspector-facet) and Slither.
* **Storage Mechanism** for all functions that are used in the facets. Store should be a data store that is friendly to recommendation engines.
* **Storage Mechanism** for additional metadata required for contract assembly. Correlate metadata with stored functions.
* **Pre-assembled** smart contracts that can be used for common use cases. Make them searchable.
* **Basic platform** with rest / graphql api endpoints using the G7 Microservice Platform Boilerplate
* **Api endpoints** that are needed to generate the required payloads.
* **Super simple UI/UX** that provides:
  * Ability to search for exiting contracts based on use case query. _(list query)_
  * Ability to select a contract from the search results. _(profile query)_
  * Once selected, ability to display a single contact and it's analytics. 
  * From the single contract display, ability to query additional functions. _(list query)_
  * From the single contract display, ability to select a function and add it to the contract. _(profile query)_
  * Ability to create a blank contract and the ability to add functions to it using above functionality.
  * Ability to test the contract locally using [Bugout Facet Inspector](https://github.com/bugout-dev/inspector-facet). Add slither as additional testing option.
  * Ability to launch the contract into a testnet and run the tests again.

### Diamond Blueprinter Roadmap

- [x] Blueprinter PRFAQ Live
- [ ] Blueprinter Wiki Live
- [ ] Create platform, data store and api
- [ ] Populate database with example contracts / functions
- [ ] Create basic FE with the UI elements listed above
- [ ] Build, Store and Manage contracts using stored example contracts / functions
- [ ] Build and Run tests for stored contracts
- [ ] Build testnet launcher 
- [ ] Accumulate audited contracts (and functions) that are considered best practice for specific use cases and store. 
- [ ] Reconstruct the functions found in these contracts as EIP-2535 Diamond Facets and launch in testnet
- [ ] Build EIP-2535 Contracts that use these newly launched Facets.
- [ ] TODO