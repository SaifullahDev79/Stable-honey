const {USDC_ADDRESS, HONEYTOKEN_ADDRESS, HONEYMARKETPLACE_ADDRESS} = require('./common')

const main = async () => {
  const [deployer, b1, b2, u1, u2] = await ethers.getSigners();
  const USDC = (await ethers.getContractFactory('USDC')).attach(USDC_ADDRESS);
  const HoneyToken = (await ethers.getContractFactory('HoneyToken')).attach(HONEYTOKEN_ADDRESS);
  const HoneyMarketplace = (await ethers.getContractFactory('HoneyMarketplace')).attach(HONEYMARKETPLACE_ADDRESS);
  
  console.log('Adding b1, b2, (HoneyMarketplace) as beekeepers...');
  await HoneyToken.addBeekeeper(b1.address);
  await HoneyToken.addBeekeeper(b2.address);
  await HoneyToken.addBeekeeper(HONEYMARKETPLACE_ADDRESS); /* This is a really important line to get this all to work for our implementation!!! */
  console.log("b1 and b2 mint 5000 HNY", u1.address, u2.address);
  await HoneyToken.connect(b1).mint(5000, "A2E4");
  await HoneyToken.connect(b2).mint(5000, "B2E4");

  console.log('b1 and b2 put 3000 HNY for sale')
  await HoneyToken.connect(b1).approve(await HoneyMarketplace.getAddress(), 3000);
  await HoneyToken.connect(b2).approve(await HoneyMarketplace.getAddress(), 3000);
  await HoneyMarketplace.connect(b1).offerHoney(3000);
  await HoneyMarketplace.connect(b2).offerHoney(3000);

  

};

main();



