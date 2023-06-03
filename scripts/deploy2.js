const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const StreamToken = await hre.ethers.getContractFactory("Stream");
  const stream = await StreamToken.deploy(5000000000000, "0xa6D6f4556B022c0C7051d62E071c0ACecE5a1228");
  await stream.deployed();
  console.log("Stream Contract deployed to:", stream.address);

  fs.writeFileSync('./config2.js', `
  export const streamTokenAddress = "${stream.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
