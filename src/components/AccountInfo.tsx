'use client';

import { useAccount, useEnsName, useEnsAvatar, useBalance, useChainId, useChains } from 'wagmi';
import { useEffect, useState } from 'react';

export function AccountInfo() {
  const { address, isConnected, isConnecting, isReconnecting, connector } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });
  const { data: balance, isLoading: balanceLoading } = useBalance({ address });
  
  const [previousAddress, setPreviousAddress] = useState<string | undefined>();
  const [addressChanged, setAddressChanged] = useState(false);
  const [previousChainId, setPreviousChainId] = useState<number | undefined>();
  const [chainChanged, setChainChanged] = useState(false);

  const currentChain = chains.find(c => c.id === chainId);

  // Detect account changes
  useEffect(() => {
    if (previousAddress && address && previousAddress !== address) {
      setAddressChanged(true);
      const timer = setTimeout(() => setAddressChanged(false), 3000);
      return () => clearTimeout(timer);
    }
    setPreviousAddress(address);
  }, [address, previousAddress]);

  // Detect chain changes
  useEffect(() => {
    if (previousChainId && chainId && previousChainId !== chainId) {
      setChainChanged(true);
      const timer = setTimeout(() => setChainChanged(false), 3000);
      return () => clearTimeout(timer);
    }
    setPreviousChainId(chainId);
  }, [chainId, previousChainId]);

  if (!isConnected) {
    return (
      <div className="account-info-empty">
        <div className="empty-icon">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </div>
        <p className="empty-text">Connect your wallet to view account details</p>
      </div>
    );
  }

  if (isConnecting || isReconnecting) {
    return (
      <div className="account-info-loading">
        <div className="loading-spinner" />
        <p className="loading-text">Connecting to wallet...</p>
      </div>
    );
  }

  return (
    <div className="account-info">
      {/* Change notifications */}
      {addressChanged && (
        <div className="change-notification address-change">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Account switched!
        </div>
      )}
      
      {chainChanged && (
        <div className="change-notification chain-change">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Network changed to {currentChain?.name}!
        </div>
      )}

      {/* Avatar & Identity */}
      <div className="identity-section">
        <div className="avatar-container">
          {ensAvatar ? (
            <img src={ensAvatar} alt="ENS Avatar" className="avatar-image" />
          ) : (
            <div className="avatar-fallback">
              <div className="avatar-gradient" />
            </div>
          )}
          <div className="avatar-status" />
        </div>
        
        <div className="identity-details">
          {ensNameLoading ? (
            <div className="skeleton skeleton-name" />
          ) : ensName ? (
            <>
              <span className="ens-name">{ensName}</span>
              <span className="address-secondary">{formatAddress(address!)}</span>
            </>
          ) : (
            <span className="address-primary">{formatAddress(address!)}</span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Balance</span>
          {balanceLoading ? (
            <div className="skeleton skeleton-balance" />
          ) : (
            <span className="stat-value">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0'}
            </span>
          )}
        </div>

        <div className="stat-card">
          <span className="stat-label">Network</span>
          <span className="stat-value network-value">
            <span className="network-dot" style={{ background: getChainColor(chainId) }} />
            {currentChain?.name || 'Unknown'}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Wallet</span>
          <span className="stat-value">{connector?.name || 'Unknown'}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Chain ID</span>
          <span className="stat-value stat-mono">{chainId}</span>
        </div>
      </div>

      {/* Full Address */}
      <div className="full-address">
        <span className="address-label">Full Address</span>
        <div className="address-copy-container">
          <code className="address-code">{address}</code>
          <button
            onClick={() => navigator.clipboard.writeText(address!)}
            className="copy-btn"
            title="Copy address"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getChainColor(chainId: number): string {
  const colors: Record<number, string> = {
    1: '#627eea',     // Ethereum
    11155111: '#627eea', // Sepolia
    137: '#8247e5',   // Polygon
    42161: '#28a0f0', // Arbitrum
    10: '#ff0420',    // Optimism
    8453: '#0052ff',  // Base
  };
  return colors[chainId] || '#888';
}
