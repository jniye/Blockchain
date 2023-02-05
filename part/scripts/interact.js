const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
const EthCrypto = require('eth-crypto');

const contract = require("../IBDX.json");

//Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const IBDVev = new ethers.Contract(CONTRACT_ADDRESS, contract, signer);


async function main() {
    const secret = "0xdf7e4afd195c8a97451f97f28dba99c73148ce00bb12c1cb098bd90e793ee551";
    console.log("secret Key:" + secret)
    const publicKey = await IBDVev.publicKey();
    console.log("The publicKey is: " + publicKey);
    
    const encrypted = await EthCrypto.encryptWithPublicKey(publicKey.slice(2), // publicKey
        secret.slice(2) + '\nJingyang Ye\nye30@illinois.edu\nhttps://github.com/jniye/BlockchainTest\nISR' // message
    );
    console.log("ENCRYPTED:",encrypted);

    const encryptedString = EthCrypto.cipher.stringify(encrypted);
    console.log("encryptedString",encryptedString);

    console.log("call sendTask");
    const tx = await IBDVev.sendTask(encryptedString);
    await tx.wait();

    console.log("End transaction");
}
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });