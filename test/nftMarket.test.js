const NftMarket = artifacts.require("NftMarket");
const truffleAssert = require("truffle-assertions");
const { ethers } = require("ethers");

contract("NftMarket", (accounts) => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther("0.3").toString();
  let _listingPrice = ethers.utils.parseEther("0.0025").toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });
  describe("Mint Token", () => {
    const tokenURI = "https://test.com";
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it("owner of first token should be address[0]", async () => {
      const owner = await _contract.ownerOf(1);
      assert(owner == accounts[0], "Owner of token is not matching zero");
    });
    it("fist token should point to the correct tokenURI", async () => {
      const actualTokenURI = await _contract.tokenURI(1);
      console.log(actualTokenURI);
      assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set");
    });

    it("should not be possible to create a NFT with used tokenURI", async () => {
      try {
        await _contract.mintToken(tokenURI, _nftPrice, { from: accounts[0] });
      } catch (e) {
        assert(e, "tokenURI was already in use");
      }
    });
    it("should have one listed item", async () => {
      const listItem = await _contract.listedItemsCount();
      assert.equal(listItem, 1, "listed items count is not 1");
    });
    it("should have create Nft Item", async () => {
      const nftItem = await _contract.getNftItem(1);
      assert.equal(nftItem.tokenId, 1, "token id is not 1");
      assert.equal(nftItem.price, _nftPrice, "token price is not 0.3 ethermum");
      assert.equal(nftItem.creator, accounts[0], "creator is not accounts[0]");
      assert.equal(nftItem.isListed, true, "token is not listed");
    });
  });

  describe("Buy NFT", () => {
    before(async () => {
      await _contract.buyNft(1, { from: accounts[1], value: _nftPrice });
    });

    it("should be unlist the item", async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, "item is still listed");
    });

    it("should decrease listed items count", async () => {
      const listedItemCount = await _contract.listedItemsCount();
      assert.equal(listedItemCount.toNumber(), 0, "Count has not decreaseds");
    });

    it("Change the owner", async () => {
      const currentOwner = await _contract.ownerOf(1);
      assert.equal(currentOwner, accounts[1], "not have changed the owner");
    });
  });
});
