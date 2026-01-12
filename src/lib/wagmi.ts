import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Wallet Auth Flow',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, base],
  ssr: true,
});
