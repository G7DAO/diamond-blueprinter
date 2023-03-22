/* global ethers */

import { BaseContract } from "ethers"

export function getSelectorsSignaturesMap(contract: BaseContract) : {[name: string]: string} {
    const signatures = Object.keys(contract.interface.functions)
    const selectorsMap = signatures.reduce((acc: {[name: string]: string}, val) => {
        if (val !== 'init(bytes)') {
            acc[contract.interface.getSighash(val)] = val
        }
        return acc
    }, {})
    return selectorsMap
}