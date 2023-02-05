// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract IBDevTaskPart2 {

    event Task(string data, address sender, address origin);

    bytes public publicKey;

    constructor(bytes memory _publicKey) {
        publicKey = _publicKey;
    }

    function sendTask(string calldata data) public {
        require(msg.sender != tx.origin, "Must call from a smart contract!");
        emit Task(data, msg.sender, tx.origin);
    }
}

contract Parttwo{
    function send(IBDevTaskPart2 part2, string calldata _data) public{
        part2.sendTask(_data);
    }
}
