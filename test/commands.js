const instance = await NftMarket.deployed();

instance.mintToken(
  "https://gateway.pinata.cloud/ipfs/QmV4DCUhxcBMGEcKofQBBhH6TAyJbPsmubeFysNuJeC4Pa?_gl=1*dvap36*_ga*MjM1NDk5NjQuMTY3ODUzNjM5Mw..*_ga_5RMPXG14TE*MTY3ODUzNjM5My4xLjEuMTY3ODUzNjQ4My41OS4wLjA.",
  "25000000000000000",
  { value: "2500000000000000", from: accounts[0] }
);
instance.mintToken(
  "https://gateway.pinata.cloud/ipfs/QmbpuhxxsP6qN8VoVb8uci8NMgu1tDasYGHKYqArkdwpSC?_gl=1*aavh3h*_ga*MjM1NDk5NjQuMTY3ODUzNjM5Mw..*_ga_5RMPXG14TE*MTY3ODUzNjM5My4xLjEuMTY3ODUzNjQ4My41OS4wLjA.",
  "40000000000000000",
  { value: "2500000000000000", from: accounts[0] }
);
