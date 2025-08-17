import HoneyTokenJSON from '../../sol/artifacts/contracts/HoneyToken.sol/HoneyToken.json';
import HoneyMarketplaceJSON from '../../sol/artifacts/contracts/HoneyMarketplace.sol/HoneyMarketplace.json';
import ERC20ABI from './erc20abi.json';

const UserTypes = Object.freeze({
  CONSUMER: Symbol("consumer"),
  BEEKEEPER:  Symbol("beekeeper"),
});

const HONEYTOKEN_ADDRESS = '0x07b9834E6E5ebD823d90af36DcA4cA108620fD3a';
const HONEYTOKEN_ABI = HoneyTokenJSON.abi;
const HONEYMARKETPLACE_ADDRESS = '0x8a04df832a066684d31B3798200A86A327076e90';
const HONEYMARKETPLACE_ABI = HoneyMarketplaceJSON.abi;
const USDC_ADDRESS = '0x9b3Cd64F51bdecE095AFdEdc9Fd2cD03F491FFC0';
const ERC20_ABI = ERC20ABI; 

export {
  UserTypes,
  HONEYTOKEN_ADDRESS,
  HONEYTOKEN_ABI,
  HONEYMARKETPLACE_ADDRESS,
  HONEYMARKETPLACE_ABI,
  USDC_ADDRESS,
  ERC20_ABI
}
