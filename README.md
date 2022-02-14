# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Test locally
```
// Run local node on terminal 
npx hardhat node
// Open another terminal 
cmd + N 
// Run local deploy case 
npx hardhat run scripts/run.js 
```

## Deploy to Rinkeby and see on OpenSea
```
npx hardhat run scripts/deploy.js --network rinkeby
``` 

## Verify contract on EtherScan 
```
npx hardhat verify YOUR_CONTRACT_ADDRESS --network rinkeby 
``` 