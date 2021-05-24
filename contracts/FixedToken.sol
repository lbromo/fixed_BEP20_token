// SPDX-License-Identifier: Beerware
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <lbromo@protonmail.ch> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * 
 * License originally authored by Poul-Henning Kamp (phk).
 * ----------------------------------------------------------------------------
 */
 
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";


contract FixedToken is ERC20 {
    uint256 public _token_per_eth;
    
    constructor(string memory name, string memory symbol, uint256 token_per_eth) ERC20(name, symbol) {
        _token_per_eth = token_per_eth;
    }
    
    // But and sell function with fixed ether value
    event Bought(uint256 amount);
    event Sold(uint256 amount);

    function tokens_per_eth() public view returns (uint256){
        return _token_per_eth;
    }
    
    function buy() payable public {
        uint256 eth_in = msg.value;
        uint256 amount_to_buy = SafeMath.mul(eth_in, _token_per_eth);
        
        _mint(msg.sender, amount_to_buy);
        emit Bought(amount_to_buy);
    }
    
    function sell(uint256 amount) public {
        uint256 eth_balance = address(this).balance;
        uint256 eth_to_sell = SafeMath.mul(SafeMath.div(amount, _token_per_eth), 1 ether);
        
        require(eth_balance >= eth_to_sell, "Not enough ETH in contract");
        
        _burn(msg.sender, SafeMath.mul(amount, 10 ** decimals()));
        payable(msg.sender).transfer(eth_to_sell);
        emit Sold(amount);
    }
}