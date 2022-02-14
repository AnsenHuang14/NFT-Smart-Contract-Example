const { expect } = require("chai");
const { ethers } = require("hardhat");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
  }
}

async function mintTest(accounts, contract, iters, callback) { 
  try {
    for (step = 0; step < iters; step++) {
        await callback(accounts, contract)
    }
  } catch (error) {
    console.log(`${error}`)
  }
}
const main = async () => {
    console.log("\n==================== Testing address ====================");
    const [owner, addr1, addr2] = await ethers.getSigners();

    await asyncForEach([owner, addr1, addr2], async function printAccountInfo(addr, index) {
      const balance = await addr.getBalance();
      console.log(`${index} - Account: ${addr.address} - Balance: ${balance}`)
    })
    
    console.log("\n==================== Contract deployment ====================")
    const nftContractFactory = await hre.ethers.getContractFactory('RandomTextNFT')
    const nftContract = await nftContractFactory.deploy()
    await nftContract.deployed()
    console.log("Contract deployed to:", nftContract.address)

    let contractOwner = await nftContract.owner()
    console.log("Contract owner:", contractOwner)

    mintPrice = await nftContract.mintPrice()
    console.log("Mint price:", mintPrice)
    console.log("\n=============================================================")
    
    // Mint test
    await mintTest([owner, addr1, addr2], nftContract, 15, async function testMinting(addresses, contract) {
      for (let index = 0; index < addresses.length; index++) {
        await contract.connect(addresses[index]).makeAnEpicNFT({
          value: 1000000000000000,
        })
        ts = await contract.totalSupply()
        ms = await contract.maxSupply()
        contractBalance = await ethers.provider.getBalance(contract.address);
        console.log(`\nContract balance" ${contractBalance}`)
        console.log(`Supply/Total: ${ts}/${ms}`)
      }
    })

    // withdraw test 
    contractBalance = await ethers.provider.getBalance(nftContract.address);
    beforeBalance = await owner.getBalance();
    console.log(`\nBefore withdrawing - Owner account: ${owner.address} - Balance: ${beforeBalance}`)

    await nftContract.connect(owner).withdraw()
    afterBalance = await owner.getBalance();
    console.log(`After withdrawing - Owner account: ${owner.address} - Balance: ${afterBalance}`)
    console.log(`Contract balance: ${contractBalance}`)
    console.log(`Account balance difference: ${afterBalance - beforeBalance}`)
    
    expect(afterBalance - beforeBalance == contractBalance)
    
  
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();