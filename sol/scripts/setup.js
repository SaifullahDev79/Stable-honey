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
  console.log("b1 and b2 mint 500 HNY", u1.address, u2.address);
  await HoneyToken.connect(b1).mint(500, "A2E4");
  await HoneyToken.connect(b2).mint(500, "B2E4");

  console.log('b1 and b2 put 300 HNY for sale')
  await HoneyToken.connect(b1).approve(HONEYMARKETPLACE_ADDRESS, 300);
  await HoneyToken.connect(b2).approve(HONEYMARKETPLACE_ADDRESS, 300);
  await HoneyMarketplace.connect(b1).offerHoney(300);
  await HoneyMarketplace.connect(b2).offerHoney(300);

  console.log('u1 and u2 buy 150 HNY for sale');
  await USDC.connect(u1).approve(HONEYMARKETPLACE_ADDRESS, 150);
  await USDC.connect(u2).approve(HONEYMARKETPLACE_ADDRESS, 150);
  await HoneyMarketplace.connect(u1).buyHoney(USDC_ADDRESS, b1.address, 150);
  await HoneyMarketplace.connect(u2).buyHoney(USDC_ADDRESS, b2.address, 150);

  console.log('u1 and u2 submit 50 HNY for redemption');
  await HoneyToken.connect(u1).approve(HONEYMARKETPLACE_ADDRESS, 50);
  await HoneyMarketplace.connect(u1).submitRedemption(b1.address, 50);
  await HoneyToken.connect(u2).approve(HONEYMARKETPLACE_ADDRESS, 50);
  await HoneyMarketplace.connect(u2).submitRedemption(b2.address, 50);
  
  console.log('b1 and b2 fulfill the 50 HNY redemption with codes');
  await HoneyMarketplace.connect(b1).fulfillRedemption(0, "ABC");
  await HoneyMarketplace.connect(b2).fulfillRedemption(0, "DEF");

};

main();



