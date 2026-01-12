export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Wallet Auth Flow</h1>
        <p className="text-gray-400 mb-8">
          Web3Proof Challenge — Build production-ready wallet authentication
        </p>

        <div className="space-y-6">
          {/* TODO: Add your ConnectButton component */}
          <section className="p-6 border border-dashed border-gray-700 rounded-xl">
            <h2 className="text-sm text-gray-500 mb-2">STEP 1</h2>
            <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
            <p className="text-gray-400 text-sm mb-4">
              Add a button to connect MetaMask or other wallets
            </p>
            <div className="p-4 bg-gray-900 rounded-lg text-gray-500 text-sm font-mono">
              {"// TODO: <ConnectButton />"}
            </div>
          </section>

          {/* TODO: Add your AccountInfo component */}
          <section className="p-6 border border-dashed border-gray-700 rounded-xl">
            <h2 className="text-sm text-gray-500 mb-2">STEP 2</h2>
            <h3 className="text-xl font-semibold mb-2">Display Account</h3>
            <p className="text-gray-400 text-sm mb-4">
              Show connected address, handle account/network changes
            </p>
            <div className="p-4 bg-gray-900 rounded-lg text-gray-500 text-sm font-mono">
              {"// TODO: <AccountInfo />"}
            </div>
          </section>

          {/* TODO: Add your SignMessage component */}
          <section className="p-6 border border-dashed border-gray-700 rounded-xl">
            <h2 className="text-sm text-gray-500 mb-2">STEP 3</h2>
            <h3 className="text-xl font-semibold mb-2">Sign Message</h3>
            <p className="text-gray-400 text-sm mb-4">
              Let user sign a message to prove wallet ownership
            </p>
            <div className="p-4 bg-gray-900 rounded-lg text-gray-500 text-sm font-mono">
              {"// TODO: <SignMessage />"}
            </div>
          </section>
        </div>

        <div className="mt-8 p-4 bg-gray-900 rounded-xl">
          <h3 className="font-semibold mb-2">📋 Checklist</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>□ Install wagmi, viem, @rainbow-me/rainbowkit</li>
            <li>□ Configure WagmiProvider in layout.tsx</li>
            <li>□ Create ConnectButton component</li>
            <li>□ Handle useAccount state</li>
            <li>□ Handle network changes</li>
            <li>□ Implement signMessage</li>
            <li>□ Add disconnect functionality</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
