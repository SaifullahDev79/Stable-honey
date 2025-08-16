const { expect } = require("chai");
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const isResultEqual = (result, data) => data.every((e, i) => e == result[i]);

describe('HoneyToken', async () => {
  it('add beekeepers and allow them to mint and burn', async () => {
    const [main, b1, b2, b3] = await ethers.getSigners();
    const HoneyToken = await ethers.deployContract('HoneyToken');

    await HoneyToken.addBeekeeper(b1.address);
    await HoneyToken.addBeekeeper(b2.address);
    await HoneyToken.addBeekeeper(b3.address);

    await HoneyToken.connect(b1).mint(100, "A2E4");
    await HoneyToken.connect(b2).mint(200, "B2E4");
    await HoneyToken.connect(b3).mint(400, "C2E4");

    expect(await HoneyToken.balanceOf(b1.address)).to.equal(100);
    expect(await HoneyToken.balanceOf(b2.address)).to.equal(200);
    expect(await HoneyToken.balanceOf(b3.address)).to.equal(400);

    await HoneyToken.connect(b1).burn(50, "A2E4");
    await HoneyToken.connect(b2).burn(100, "B2E4");
    await HoneyToken.connect(b3).burn(400, "C2E4");

    expect(await HoneyToken.balanceOf(b1.address)).to.equal(50);
    expect(await HoneyToken.balanceOf(b2.address)).to.equal(100);
    expect(await HoneyToken.balanceOf(b3.address)).to.equal(0);
  });
});
  
describe('HoneyMarketplace', async () => {

  const setupHoney = async () => {
    const [main, b1, b2, u1, u2, ...signers] = await ethers.getSigners();
    const HoneyToken = await ethers.deployContract('HoneyToken');

    await HoneyToken.addBeekeeper(b1.address);
    await HoneyToken.addBeekeeper(b2.address);
    
    await HoneyToken.connect(b1).mint(100, "A2E4");
    await HoneyToken.connect(b2).mint(200, "B2E4");

    const USDC = await ethers.deployContract('USDC');

    await USDC.transfer(u1.address, 1000);
    await USDC.transfer(u2.address, 1000);

    const HoneyMarketplace = await ethers.deployContract('HoneyMarketplace', [await HoneyToken.getAddress(), await USDC.getAddress()]);

    return { main, b1, b2, u1, u2, HoneyToken, USDC, HoneyMarketplace };
  };

  it('offer honey and buy honey', async () => {
    const { main, b1, b2, u1, u2, HoneyToken, USDC, HoneyMarketplace } = await loadFixture(setupHoney);

    await HoneyToken.connect(b1).approve(await HoneyMarketplace.getAddress(), 10);
    await HoneyToken.connect(b2).approve(await HoneyMarketplace.getAddress(), 20);
    await HoneyMarketplace.connect(b1).offerHoney(10);
    await HoneyMarketplace.connect(b2).offerHoney(20);

    expect(await HoneyToken.balanceOf(b1.address)).to.equal(90);
    expect(await HoneyToken.balanceOf(b2.address)).to.equal(180);
    expect(await HoneyToken.balanceOf(await HoneyMarketplace.getAddress())).to.equal(30);

  });
});


