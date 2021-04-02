// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

contract Sample{
    int sum;
    function Sum(int _a,int _b) public{
        sum = _a + _b;
    }
    function getSum() public view returns(int){
        return sum;
    }
}