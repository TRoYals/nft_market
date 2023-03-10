import { ethers } from "ethers";
import { Nft } from "../../../types/nft";
import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

type UseListedNftsResponse = {
  buyNft: (token: number, value: number) => Promise<void>;
};
type ListedNftsHookFactory = CryptoHookFactory<any, UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useListedNfts" : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getAllNftsOnSale();

        for (let i = 0; i < coreNfts.length; i++) {
          const item = coreNfts[i];
          const tokenURI = await contract!.tokenURI(item.tokenId);
          const metaRes = await fetch(tokenURI);
          const meta = await metaRes.json();

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            meta,
          });
        }

        return nfts;
      }
    );

    const buyNft = async (tokenId: number, value: number) => {
      try {
        await contract?.buyNft(tokenId, {
          value: ethers.utils.parseEther(value.toString()),
        });

        alert("you have bought the Nft, see the profile pages");
      } catch (e: any) {
        console.error(e.message);
      }
    };

    return {
      ...swr,
      buyNft,
      data: data || [],
    };
  };
