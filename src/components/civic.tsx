import React, {useEffect, useState} from 'react';
import { jsx, Box } from 'theme-ui';
import { rgba } from 'polished';
import { useRouter } from 'next/router';
import Link from 'next/link';
import logo from './logo.svg';
import {
    createClient,
    useAccount,
    useEnsAvatar,
    useEnsName, useNetwork,
    WagmiConfig
} from "wagmi";
import {mainnet, goerli, polygon, optimism, arbitrum, polygonMumbai, sepolia, arbitrumGoerli, optimismGoerli } from 'wagmi/chains';
import { xdcTestnet } from './chains';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import {GatewayStatus, GatewayProvider, IdentityButton, useGateway} from "@civic/ethereum-gateway-react";
import {Wallet} from 'ethers';

const GATEKEEPER_NETWORK = process.env.REACT_APP_GATEKEEPER_NETWORK || "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6";
//uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv
//ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6

// obtain the chain from the URL hash, or provide a list of all supported chains
const chains = { xdcTestnet, goerli, polygon, mainnet, optimism, arbitrum, polygonMumbai, sepolia, arbitrumGoerli, optimismGoerli }
const hash = global.window && window.location.hash.replace("#", "");
const selectedChain = chains[hash as keyof typeof chains];
const clientChains = selectedChain ? [selectedChain] : Object.values(chains)

const client = createClient(
    getDefaultClient({
        appName: 'Streamagenic DApp',
        chains: clientChains,
    })
)

const Content = () => {
    const { gatewayStatus } = useGateway();
    const { address, isConnected } = useAccount()
    const network = useNetwork()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    return <>
        { ensAvatar ?
            <img src={ensAvatar} className="App-logo" alt="logo" /> :
            <img src="/images/logoonly.png" className="pt-10 pb-10" alt="logo" /> }
        { ensName ? <p className="text-center text-white text-xl font-bold">{ensName}</p> : <p className="text-center text-white text-xl font-bold">{address}</p> }
        { network.chain?.name && <p className="text-center text-white text-xl font-bold">{network.chain.name}</p> }
        {isConnected && <IdentityButton />}
        { gatewayStatus !== GatewayStatus.ACTIVE && <div className="text-center text-white text-xl font-bold">Verify you are a unique person before entering</div>}

        { gatewayStatus == GatewayStatus.ACTIVE && <Link href="/publishnews"><button disabled={gatewayStatus !== GatewayStatus.ACTIVE} onClick={() => login()} className="font-bold mt-20 bg-blue-900 text-white text-2xl rounded p-4 shadow-lg">Click to proceed</button></Link>}
    </>
}

const useWallet = ():Wallet | undefined => {
    const { connector, address } = useAccount();
    const [wallet, setWallet] = useState<Wallet>();
    // update the wallet if the connector or address changes
    useEffect(() => {
        if (!connector) return;
        connector.getSigner().then(setWallet);
    }, [connector, address]);

    return wallet;
}

const Gateway = () => {
    const wallet = useWallet();
    if (!wallet) return <><Content/></>

    return <GatewayProvider
        gatekeeperNetwork={GATEKEEPER_NETWORK}
        wallet={wallet}
    >
        <Content/>
    </GatewayProvider>
}

const login = () => {

   
 }


function Civic() {
   
    const navigate = useRouter();


    return (
        <Box as="section"  sx={styles.section}>
            <div className=" text-center text-white text-xl font-bold pt-10 pb-2">
                    <h1> Verify you are not a bot</h1>
                    <h4> Verification powered by Civic Pass</h4>
            </div>
        <div className="flex justify-center">

            <WagmiConfig client={client}>
                <ConnectKitProvider theme="auto">
                    <header className="flex flex-col justify-center">
                        <ConnectKitButton  />
                        <Gateway />
                    </header>
                </ConnectKitProvider>
            </WagmiConfig>
        </div>
        </Box>
    );
}

export default Civic;

const styles = {
    section: {
      backgroundColor: 'primary',
      pt: [17, null, null, 20, null],
      pb: [6, null, null, 12, 16],
    },
    
  };