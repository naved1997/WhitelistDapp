//SPDX-License-Identifier:MIT

pragma solidity 0.8.17;

contract Whitelist{
    uint256 public MaxWhitelist;
    uint256 public WhitelistedAdd;

    mapping(address=>bool) public Whitelisted;

event AddedtoWhitelist(address Add);


constructor(){
   MaxWhitelist=10; 
}

function AddtoWhitelist() public {
    require(Whitelisted[msg.sender]==false,"Already Whitelisted");
    require(WhitelistedAdd<MaxWhitelist,"Max Address Whitelisted");

    Whitelisted[msg.sender]=true;
    WhitelistedAdd++;

emit AddedtoWhitelist(msg.sender);
}

}