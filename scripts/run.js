const main = async () => {
  // hre is the Hardhat global object containing all the tools and config to use in the project

  const [owner, signer1, signer2] = await hre.ethers.getSigners();
  // Compile the contract and generate the artifact json file. This file is used to interact with the SM on the blockchain
  const galaxyContractFactory = await hre.ethers.getContractFactory("GalaxyPortal");
  // Deploy the contract on a local Ethereum network. This local network is destroy juste after the deployment
  const galaxyContract = await galaxyContractFactory.deploy();
  // Waiting the deployement & execution of the contract on the local blockchain. This will execute the constructor of the contract
  await galaxyContract.deployed();

  console.log("Contract deployed to : ", galaxyContract.address);
  console.log("contract deployed by : ", owner.address);
  console.log("Others addresses : %s and %s", signer1.address, signer2.address);

  let countStars;
  // View function don't send a transaction. So we don't have to wait the Txn to be minned
  countStars = await galaxyContract.getTotalStars();
  // galaxyContract.getTotalStars() return a uint256 : it's a bigNumber. We have to parse it as a number
  console.log(countStars.toNumber());
  
  // Execute the function to write on the SM's state. It's send a transaction to the BC
  const firstStarTxn = await galaxyContract.star("A message");
  // Waiting the transaction to be minned
  await firstStarTxn.wait();

  const secondStarTxn = await galaxyContract.connect(signer1).star("Another message");
  await secondStarTxn.wait();

  countStars = await galaxyContract.getTotalStars();
  console.log(countStars.toNumber());

  const allStars = await galaxyContract.getAllStars();
  console.log(allStars);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();