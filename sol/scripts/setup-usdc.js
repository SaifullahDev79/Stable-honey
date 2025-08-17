const {USDC_ADDRESS} = require('./common');

const main = async () => {
  const [deployer, b1, b2, u1, u2] = await ethers.getSigners();
  const USDC = (await ethers.getContractFactory('USDC')).attach(USDC_ADDRESS);
  
  console.log('Sending USDC...');
  await USDC.transfer(u1.address, 1000);
  await USDC.transfer(u2.address, 1000);
  console.log("USDC sent to", u1.address, u2.address);
};

main();


