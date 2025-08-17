// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./HoneyToken.sol";

contract HoneyMarketplace {

    struct RedemptionRequest {
        address consumer;
        uint256 amount;
    }

    //Beekeepers to the amount of honey they're offering for sale
    mapping(address => uint256) public honeyMarketplace; 
    //Beekeepers to their redemption requests
    mapping(address => RedemptionRequest[]) public redemptionRequests;

    uint constant public USD_HONEY_RATE = 1;
    address constant public USDC_ADDRESS = 0x0000000000000000000000000000000000000000;
    address constant public DAI_ADDRESS = 0x0000000000000000000000000000000000000000;
    address immutable public HONEYTOKEN_ADDRESS;
    address immutable public TEST_DAI_ADDRESS;

    // TODO: Refactor this later
    modifier onlyBeekeeper {
        require(HoneyToken(HONEYTOKEN_ADDRESS).beekeepers(msg.sender));
        _;
    } 

    constructor(address honeytokenAddress, address testDAIAddress) {
        HONEYTOKEN_ADDRESS = honeytokenAddress;
        TEST_DAI_ADDRESS = testDAIAddress;
    }   

    function offerHoney(uint256 amount) public onlyBeekeeper {
        honeyMarketplace[msg.sender] += amount;
        HoneyToken(HONEYTOKEN_ADDRESS).transferFrom(msg.sender, address(this), amount);
    }

    function buyHoney(address stablecoin, address beekeeper, uint256 honeyAmount) public {
        require(stablecoin == USDC_ADDRESS || stablecoin == DAI_ADDRESS ||
               stablecoin == TEST_DAI_ADDRESS);
        require(honeyAmount >= honeyMarketplace[beekeeper]);
        ERC20(stablecoin).transferFrom(msg.sender, beekeeper, honeyAmount * USD_HONEY_RATE);
        HoneyToken(HONEYTOKEN_ADDRESS).transfer(msg.sender, honeyAmount);
        honeyMarketplace[beekeeper] -= honeyAmount;
    }

    function submitRedemption(address beekeeper, uint256 honeyAmount) public {
        HoneyToken(HONEYTOKEN_ADDRESS).transferFrom(msg.sender, address(this), honeyAmount);
        redemptionRequests[beekeeper].push(RedemptionRequest({
            consumer: msg.sender, amount: honeyAmount
        }));
    }

    function fulfillRedemption(uint256 consumerId, string calldata honeyId) public {
        require(redemptionRequests[msg.sender].length != 0, 'notzero');
        HoneyToken(HONEYTOKEN_ADDRESS).burn(redemptionRequests[msg.sender][consumerId].amount, honeyId);
        delete redemptionRequests[msg.sender][consumerId];
    }

}
