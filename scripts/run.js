const { ethers } = require("hardhat");

const main = async () => {
    const [owner] = await ethers.getSigners();
    prov = ethers.getDefaultProvider();
    const balance = await prov.getBalance(owner.address);
    console.log("Account:", owner.address);
    console.log("Account balance:", balance);

    const nftContractFactory = await hre.ethers.getContractFactory('RandomTextNFT');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    let contractOwner = await nftContract.owner()

    console.log("Contract deployed to:", nftContract.address);
    console.log("Contract owner:", contractOwner);

    mintPrice = await nftContract.mintPrice()
    console.log("Mint price:", mintPrice);
  
    // Call the function.
    let txn = await nftContract.makeAnEpicNFT()
    // Wait for it to be mined.
    await txn.wait()
    ts = await nftContract.totalSupply()
    ms = await nftContract.maxSupply()
    console.log("Total/Max", ts, "/", ms)
  
    // Mint another NFT for fun.
    txn = await nftContract.makeAnEpicNFT()
    // Wait for it to be mined.
    await txn.wait()
    ts = await nftContract.totalSupply()
    ms = await nftContract.maxSupply()
    console.log("Total/Max", ts, "/", ms)
  
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