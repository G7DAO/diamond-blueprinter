import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { Layout } from '@/components';
import { DiamondContextProvider } from '@/contexts';

const { chains, provider, webSocketProvider } = configureChains(
  [polygon],
  [alchemyProvider({ apiKey: 'Mz4PxJrs78Ud3oRJ3FlAcaPyvhLST_bw' })],
);

const { connectors } = getDefaultWallets({
  appName: 'Diamond blueprinter',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DiamondContextProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </DiamondContextProvider>
  );
}
