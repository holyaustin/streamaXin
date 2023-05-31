# StreamaGenic : Decentralized Video Sharing & Conference Meeting

![StreamaGenic ](https://bafkreidugtjoxts62zsi32riqsjlpt643vnqxtaljo4tba2n2dlqvb2jyq.ipfs.w3s.link/)

Video conference meeting for stremaXin app - A Decentralized Video News Sharing Platform where users upload news on demand.

## Introduction

StreamaGenic is a web3 video project with the aim of helping creators publish video news files and share them easily while owning their content and making money from it. This project intends to build a web3 news for everyone around the globe. Users that are Eye witness to events, captures them and publish on the new platform. 
News / Contents can also be streamed live through Livepeers streams. It uses the open zeppelin ERC721 standard, Files are store to IPFS / Filecoin using W3UI and  file metadata URI stored on XDC apothem testnet. Upon retrieval, video is access and transcoded with livepeer.js. 
XDC Blockchain was the best choice for deployment to its speed and to reduce the cost of transactions while interacting with the blockchain. Lit was used for encryption, ENS for reverse name lookup, Huddle for conference meeting and XMTP for chat and interaction. NFTPort was uded to send Milestone rewards when a video hit certain number of views.

## Web 3.0 technologies Used
XDCA
Frontend: NextJS, postcss, tailwindcss, Theme

Web3 technologies: IPFS/filecoin (W3UI), Livepeer (livepeer.js), Web3Modal, XMTP, NFT Port, ENS, Lit Protocol, XDC,  Huddle01  
Backend: Solidity, Node.js

Blockchain deployed to:  XDC Apothem Testnet.

## Description

This project was made using several technologies. The front-end was designed using a server-side-rendering javascript tech known as NextJS. the latest version of Next was used because of how fast it was to build the project.  IPFS / Filecoin's W3UI from Web3.Storage was used to store user's video on their decentralized storage. videos of various news can be viewed on demand. They can share these Videos to anyone through a sharing mechansism that is easy to copy out the sharing IPFS URL.
XMTP is used for wallet to wallet messaging using the XMTP SDK. Huddle01 was used for conference meeting.

The smart contract uses ERC-721 specification to hold metadata URI, ethers.js was used to interact with the smart contract. The contract was deployed to apothem blockchain. The entire project demo was hosted to Vercel.

## Live DApp hosted on

Live Dapp on Vercel: - <https://streamaxin.vercel.app/>
Conference meeting: <https://streamagenic-meeting.vercel.app/>



Deployed to XDC Chain:
  XDC apothem deployed Address = "xdc7064f88f4840588b78014d6d3f4556FAAdF20893"

  <https://explorer.apothem.network/address/xdc7064f88f4840588b78014d6d3f4556faadf20893#transactions>

 Youtube video link: <https://youtu.be/kZvxCGMPci8>

## Getting Started

First, run the development server:

```text
clone the repo https://github.com/holyaustin/streamaxin.git
# next is to 
npm install
# then
npm run dev
# or
yarn dev
```

Open [http://localhost:3016](http://localhost:3016) with your browser to see the result.



## How to deploy to XDC apothem  blockchain, update hardhat.config

npx hardhat run scripts/deploy.js --network apothem

## Connect with me and send me a mail

E-mail - holyaustin@yahoo.com

stay connected on twitter @holyaustin

https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8
