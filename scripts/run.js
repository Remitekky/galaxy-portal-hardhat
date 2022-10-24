const main = async () => {
  // hre is the Hardhat global object containing all the tools and config to use in the project

  const [owner, randomPerson] = await hre.ethers.getSigners();
  // Compile th econtract and generate the artifact json file. This file is used to interact with the SM on the blockchain
  const galaxyContractFactory = await hre.ethers.getContractFactory("GalaxyPortal");
  // Deploy the contract on a local Ethereum network. This local network is destroy juste after the deployment
  const galaxyContract = await galaxyContractFactory.deploy();
  // Waiting the deployement & execution of the contract on the local blockchain. This will execute the constructor of the contract
  await galaxyContract.deployed();
  // Log the address where the contract is deployed
  console.log("Contract deployed to : ", galaxyContract.address);

  console.log("contract deployed by : ", owner.address);

  await galaxyContract.getTotalStars();
  
  const firstStarTxn = await galaxyContract.star();
  await firstStarTxn.wait();

  await galaxyContract.getTotalStars();

  const secondStarTxn = await galaxyContract.connect(randomPerson).star();
  await secondStarTxn.wait();

  await galaxyContract.getTotalStars();
  await galaxyContract.getExplorers();
  await galaxyContract.getExplorerStars(owner.address);
  await galaxyContract.getExplorerStars(randomPerson.address);
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