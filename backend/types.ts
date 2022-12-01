interface Token {
    address: string,
    decimal: number,
    symbol: string
}

interface Transaction {
    tokenName: string,
    tokenAddress: string,
    tokenDecimal: number,
    amount : number,
    direction : "IN" | "OUT",
    timestamp: number,
    tokenUSDPrice? : string,
}

export { 
    Token,
    Transaction
}