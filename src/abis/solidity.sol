// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Checker {
    function isContract(address _addr) external view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
}
