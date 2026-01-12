'use client';

import { ConnectButton } from '@/components/ConnectButton';
import { AccountInfo } from '@/components/AccountInfo';
import { SignMessage } from '@/components/SignMessage';
import { useAccount, useDisconnect } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <main className="main-container">
      {/* Background effects */}
      <div className="bg-grid" />
      <div className="bg-gradient-orb orb-1" />
      <div className="bg-gradient-orb orb-2" />
      
      <div className="content-wrapper">
        {/* Header */}
        <header className="header">
          <div className="logo-section">
            <div className="logo">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <rect width="32" height="32" rx="8" fill="url(#logo-gradient)"/>
                <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#ff5f1f"/>
                    <stop offset="1" stopColor="#ff8f5f"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="title">Wallet Auth Flow</h1>
              <p className="subtitle">Web3Proof Challenge</p>
            </div>
          </div>
          
          <div className="header-actions">
            <ConnectButton />
            {isConnected && (
              <button onClick={() => disconnect()} className="disconnect-btn">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="cards-grid">
          {/* Account Info Card */}
          <section className="card card-account">
            <div className="card-header">
              <div className="card-icon account-icon">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="card-title">Account Details</h2>
                <p className="card-description">View your connected wallet information</p>
              </div>
            </div>
            <div className="card-content">
              <AccountInfo />
            </div>
          </section>

          {/* Sign Message Card */}
          <section className="card card-sign">
            <div className="card-header">
              <div className="card-icon sign-icon">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h2 className="card-title">Sign Message</h2>
                <p className="card-description">Prove ownership of your wallet</p>
              </div>
            </div>
            <div className="card-content">
              <SignMessage />
            </div>
          </section>
        </div>

        {/* Footer Checklist */}
        <footer className="footer">
          <div className="checklist">
            <h3 className="checklist-title">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Challenge Checklist
            </h3>
            <div className="checklist-grid">
              <CheckItem done label="Wagmi + RainbowKit installed" />
              <CheckItem done label="WagmiProvider configured" />
              <CheckItem done label="ConnectButton component" />
              <CheckItem done label="Account state handling" />
              <CheckItem done label="Network change detection" />
              <CheckItem done label="Message signing" />
              <CheckItem done label="Signature verification" />
              <CheckItem done label="Disconnect functionality" />
              <CheckItem done label="Loading states" />
              <CheckItem done label="Error handling" />
              <CheckItem done label="ENS resolution" />
              <CheckItem done label="Multi-chain support" />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function CheckItem({ done, label }: { done?: boolean; label: string }) {
  return (
    <div className={`check-item ${done ? 'check-done' : ''}`}>
      <div className={`check-box ${done ? 'checked' : ''}`}>
        {done && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
}
