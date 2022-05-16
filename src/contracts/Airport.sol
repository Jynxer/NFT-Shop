//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Airport is ERC721, ERC721Enumerable {
    string[] public images;
    mapping(string => bool) _imageExists;

    constructor() ERC721("MyAirportCollectible", "MAC") {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _image) public {
        // Change visibility to onlyOwner!
        require(!_imageExists[_image], "image already in use!");
        images.push(_image);
        uint256 _id = images.length;
        _mint(msg.sender, _id);
        _imageExists[_image] = true;
    }
}
