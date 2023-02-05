const API_KEY = "PGAt8lP6cjgPED9MYpnAYhK0KPL0HwUJ"
const PRIVATE_KEY = "f23b74935a654e8b1686dbaa66b6b6fd1f7c9cf40336373fd87e6e03425e61a9"

const CONTRACT_ADDRESS = "0xAD30A655E9a7Fc4cfEc391247f3702e0C6aB4ccE"

const { ethers } = require("hardhat");
const EthCrypto = require('eth-crypto');

const contract = require("../artifacts/contracts/parttwo.sol/Parttwo.json");

//Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const IBDVev = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


async function main() {
    const secret = "0xdf7e4afd195c8a97451f97f28dba99c73148ce00bb12c1cb098bd90e793ee551";
    console.log("secret Key:" + secret)
    
    const encrypted = await EthCrypto.encryptWithPublicKey("80f712a0d29c0853b3cb9459459729c2a5af5d6f528130cf149c4549b794cf951961c592d9b86695c3c2f23694c6e2472e163a29a011b7cc932817bfee9448ce", // publicKey
        secret.slice(2) + '\nJingyang Ye\nye30@illinois.edu\nhttps://github.com/jniye/BlockchainTest\nISR' // message
    );
    console.log("ENCRYPTED:",encrypted);

    const encryptedString = EthCrypto.cipher.stringify(encrypted);
    console.log("encryptedString",encryptedString);

    console.log("call sendTask");
    const tx = await IBDVev.send("0x3cd77c1ffa865D57076d1B0B321C73F55b2Ca006",encryptedString);
    await tx.wait();

    console.log("End transaction");
}
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });