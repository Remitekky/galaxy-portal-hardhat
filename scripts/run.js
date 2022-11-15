const main = async () => {
  // hre is the Hardhat global object containing all the tools and config to use in the project

  const [owner, signer1, signer2] = await hre.ethers.getSigners();
  // Compile the contract and generate the artifact json file. This file is used to interact with the SM on the blockchain
  const galaxyContractFactory = await hre.ethers.getContractFactory("GalaxyPortal");
  // Deploy the contract on a local Ethereum network. This local network is destroy juste after the deployment
  const galaxyContract = await galaxyContractFactory.deploy({
    // We fund the contract with ethers on deployment
    value: hre.ethers.utils.parseEther("0.1"),
  });
  // Waiting the deployement & execution of the contract on the local blockchain. This will execute the constructor of the contract
  await galaxyContract.deployed();

  console.log("Contract deployed to : ", galaxyContract.address);
  console.log("contract deployed by : ", owner.address);
  console.log("Others addresses : %s and %s", signer1.address, signer2.address);

  // Log contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    galaxyContract.address
  );
  console.log(
    "Contract balance : ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Throw 2 stars with a message
  const starTxn = await galaxyContract.star("A message");
  starTxn.wait();

  const starTxn2 = await galaxyContract.star("A second message");
  starTxn.wait();

  // Log contract balance
  contractBalance = await hre.ethers.provider.getBalance(
    galaxyContract.address
  );
  console.log(
    "Contract balance : ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Log all the start throwed
  let allStars = await galaxyContract.getAllStars();
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