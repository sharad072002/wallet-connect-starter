import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wallet Auth Flow | Web3Proof Challenge",
  description: "Build production-ready wallet authentication",
};

// TODO: Add your wallet providers here
// import { WagmiProvider } from 'wagmi'
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
// import { QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Wrap with providers */}
        {/* <WagmiProvider config={config}> */}
        {/*   <QueryClientProvider client={queryClient}> */}
        {/*     <RainbowKitProvider> */}
                {children}
        {/*     </RainbowKitProvider> */}
        {/*   </QueryClientProvider> */}
        {/* </WagmiProvider> */}
      </body>
    </html>
  );
}
