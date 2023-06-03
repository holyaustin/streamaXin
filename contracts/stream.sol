// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Stream is ERC20, Ownable {

    constructor(uint256 _supply, address _tokenAdd) ERC20("Stream", "STREAM") {
        _mint(_tokenAdd, _supply * 10 ** decimals());
    }
       
    receive() external payable {}
}


// 100000000000000
