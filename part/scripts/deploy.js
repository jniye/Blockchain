const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Deploy First
    const First = await ethers.getContractFactory('IBDevTaskPart2');
    const first = await First.deploy("0x80f712a0d29c0853b3cb9459459729c2a5af5d6f528130cf149c4549b794cf951961c592d9b86695c3c2f23694c6e2472e163a29a011b7cc932817bfee9448ce");

    // Deploy Second
    const Second = await ethers.getContractFactory('Parttwo');
    const second = await Second.deploy();

    console.log( "First: " + first.address );
    console.log( "Second: " + second.address ); 
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });