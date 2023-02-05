// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PartOne{
    
    // function testone(sendTask _Task, string memory data) external{
    //     sendTask(data);
    // }
    event Update(string oldone, string newone);

    string public mes;

    constructor(string memory init){ mes = init;}

    function update(string memory newMes) public{
        string memory oldMes = mes;
        mes = newMes;
        emit Update(oldMes, newMes);
    }

}