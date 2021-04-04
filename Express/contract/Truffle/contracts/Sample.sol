// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

contract Sample{
      address public owner = msg.sender;

    int sum;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }


    function Sum(int _a,int _b) public restricted{
        sum = _a + _b;
    }
    function getSum() public view returns(int){
        return sum;
    }
}