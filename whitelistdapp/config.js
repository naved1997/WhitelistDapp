// Always put addresses in lowerCase()
//import { abi } from "./contracts/cryptowaifus/cryptowaifus.json";

export const ChainConfig = {
  bnb: {
    testnet: {
      address: "0x94069C5c7A3415EDe1cFE89d574E91698a5bDFB9".toLowerCase(),
      ChainConfig: {
        chainId: "0x61",
        chainName: "BSC Testnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
      },
      abi:  [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "Add",
                "type": "address"
              }
            ],
            "name": "AddedtoWhitelist",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "AddtoWhitelist",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "MaxWhitelist",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "Whitelisted",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "WhitelistedAdd",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]
      
    },
  },
};
