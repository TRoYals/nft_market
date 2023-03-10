// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;

mapping(string=>bool) private _usedTokenURIs;
mapping(uint =>NftItem) private _idToNftItem;

struct NftItem {
  uint tokenId;
  uint price;
  address creator;
  bool isListed;
}
event NftItemCreated(
  uint tokenId,
  uint price,
  address creator,
  bool isListed
);

uint public listingPrice = 0.0025 ether;

  constructor() ERC721 ("CreaturesNFT", "CNFT") {}
     function tokenURIExists(string memory tokenURI) public view returns (bool) {
return _usedTokenURIs[tokenURI] ==true;
  }
  function getNftItem(uint tokenId) public view returns (NftItem memory) {
    return _idToNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint) {
    return _listedItems.current();
  }

  function mintToken(string memory tokenURI,uint price)public payable returns (uint) {
    require(!tokenURIExists(tokenURI),"Token URI already in use");
    require(msg.value == listingPrice,"price must be equal to listing price");
    _tokenIds.increment();

    _listedItems.increment();
    uint newTokenId = _tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _createNftItem(newTokenId, price);
    _usedTokenURIs[tokenURI] = true;
    return newTokenId;
  }

 function buyNft(
  uint tokenId
 ) public payable {
  uint price = _idToNftItem[tokenId].price;
  address owner = ERC721.ownerOf(tokenId);
require(msg.sender!=owner,"you already hold the NFT");
require(msg.value == price,"please submit the asking price");
_idToNftItem[tokenId].isListed = false;
_listedItems.decrement();
_transfer(owner,msg.sender,tokenId);
 }

  function _createNftItem(uint tokenId,uint price) private {
    require(price>0,"price must be at least 1 wei");
    _idToNftItem[tokenId] = NftItem(tokenId,price,msg.sender,true);
emit NftItemCreated(tokenId,price,msg.sender,true);
  }

}