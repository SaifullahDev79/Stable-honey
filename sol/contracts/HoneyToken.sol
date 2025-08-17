// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HoneyToken is ERC20, Ownable {

    mapping(address => bool) public beekeepers;

    modifier onlyBeekeeper {
        require(beekeepers[msg.sender]);
        _;
    }    
    
    constructor() ERC20("Honey Stablecoin", "HNY") Ownable(msg.sender) {
//        uint256 initialSupply = 1e24;
//        _mint(msg.sender, initialSupply);
    }

    function addBeekeeper(address beekeper) public onlyOwner {
        beekeepers[beekeper] = true;
        emit AddedBeekeeper(beekeper);
    }

    function mint(uint256 amount, string calldata honeyId) public onlyBeekeeper {
        _mint(msg.sender, amount);
        emit Mint(msg.sender, amount, honeyId);
    }

    function burn(uint256 amount, string calldata honeyId) public onlyBeekeeper {
        _burn(msg.sender, amount);
        emit Burn(msg.sender, amount, honeyId);
    }

    event AddedBeekeeper(address beekeeper);
    event Mint(address minter, uint256 amount, string honeyId);
    event Burn(address burner, uint256 amount, string honeyId);
}

