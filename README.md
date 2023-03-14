# NFT market

## before start

need to have the MetaMask wallet.
Change your network to Sepolia Test Network.

## start

```
npm run dev
```

## data structure

├── .env.development
├── .env.production
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
├── components
│   ├── hooks
│   │   └── web3
│   ├── index.ts
│   ├── providers
│   │   ├── index.ts
│   │   └── web3
│   └── ui
│   ├── layout
│   ├── link
│   ├── navbar
│   └── nft
├── content
│   └── meta.json
├── contracts
│   ├── Migrations.sol
│   └── NftMarket.sol
├── keys.json
├── migrations
│   ├── 1_initial_migration.js
│   └── 2_nftMarket_migration.js
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── \_app.tsx
│   ├── \_document.tsx
│   ├── api
│   │   ├── utils.ts
│   │   ├── verify-image.ts
│   │   └── verify.ts
│   ├── index.tsx
│   ├── nft
│   │   ├── allNft.tsx
│   │   └── create.tsx
│   └── profile.tsx
├── postcss.config.js
├── public
│   ├── contracts
│   │   ├── Fantom721Collection.json
│   │   ├── Migrations.json
│   │   └── NftMarket.json
│   ├── favicon.ico
│   ├── images
│   │   ├── page_logo.png
│   │   └── small-eth.webp
│   ├── next.svg
│   ├── thirteen.svg
│   └── vercel.svg
├── styles
│   └── globals.css
├── tailwind.config.js
├── test
│   ├── commands.js
│   ├── nftMarket.test.js
│   └── nftMeta
│   ├── images
│   └── json
├── tree.md
├── truffle-config.js
├── tsconfig.json
└── types
├── hooks.ts
├── nft.ts
└── nftMarketContract.ts
