# Wallet Auth Flow Challenge

> Web3Proof Challenge — Prove you can build production-ready wallet authentication

## 🎯 Objective

Build a complete wallet authentication system for a Web3 dApp.

## 📋 Requirements

### Must Have (Required to Pass)
- [ ] Connect wallet (MetaMask minimum)
- [ ] Display connected wallet address
- [ ] Handle account changes (user switches wallet)
- [ ] Handle network/chain changes
- [ ] Sign a message to prove ownership
- [ ] Disconnect wallet functionality
- [ ] Loading states for async operations
- [ ] Error handling with user-friendly messages

### Bonus Points
- [ ] WalletConnect support (mobile wallets)
- [ ] Sign-In with Ethereum (SIWE)
- [ ] ENS name resolution
- [ ] Multiple chain support

## 🛠 Recommended Stack

```bash
npm install wagmi viem @rainbow-me/rainbowkit @tanstack/react-query
```

Or use ethers.js + Web3Modal if preferred.

## 🚀 Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/wallet-auth-flow-starter
cd wallet-auth-flow-starter

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 📁 Structure

```
src/
├── app/
│   ├── page.tsx          # Main page - add your components here
│   ├── layout.tsx        # Add providers here
│   └── globals.css
├── components/
│   ├── ConnectButton.tsx # TODO: Create this
│   ├── AccountInfo.tsx   # TODO: Create this
│   └── SignMessage.tsx   # TODO: Create this
└── lib/
    └── wagmi.ts          # TODO: Configure wallet
```

## ✅ Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Wallet library installed (wagmi/ethers) | 15 |
| Connect wallet works | 15 |
| Account state handling | 10 |
| Network change handling | 10 |
| Message signing | 15 |
| Disconnect works | 5 |
| UI library (RainbowKit/Web3Modal) | 10 |
| SIWE implementation | 10 |
| Tests present & pass | 10 |

**Pass threshold: 60/100**

## 📤 Submission

1. Fork this repository
2. Implement all requirements
3. Push to your fork
4. Submit your repo URL on [Web3Proof](https://web3proof.dev)

## 💡 Tips

- Use `useAccount` hook to track connection state
- Use `useSignMessage` for message signing
- Handle edge cases: rejected signatures, wrong network
- Test with MetaMask and mobile wallets

## 📚 Resources

- [wagmi docs](https://wagmi.sh)
- [RainbowKit](https://rainbowkit.com)
- [SIWE spec](https://eips.ethereum.org/EIPS/eip-4361)

---

Good luck! 🚀
