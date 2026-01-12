'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

export function ConnectButton() {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="connect-btn group"
                  >
                    <span className="connect-btn-glow" />
                    <span className="connect-btn-content">
                      <svg
                        className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Connect Wallet
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="wrong-network-btn"
                  >
                    <span className="pulse-dot" />
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="connected-container">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="chain-btn"
                  >
                    {chain.hasIcon && (
                      <div
                        className="chain-icon"
                        style={{ background: chain.iconBackground }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                    <span className="chain-name">{chain.name}</span>
                    <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="account-btn"
                  >
                    <div className="account-avatar">
                      {account.ensAvatar ? (
                        <img src={account.ensAvatar} alt="ENS Avatar" className="w-full h-full rounded-full" />
                      ) : (
                        <div className="default-avatar" />
                      )}
                    </div>
                    <span className="account-display">
                      {account.ensName || account.displayName}
                    </span>
                    <span className="account-balance">
                      {account.displayBalance}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
