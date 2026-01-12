'use client';

import { useSignMessage, useAccount } from 'wagmi';
import { useState } from 'react';
import { verifyMessage } from 'viem';

export function SignMessage() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync, isPending } = useSignMessage();
  
  const [message, setMessage] = useState('I am signing this message to prove I own this wallet.');
  const [signature, setSignature] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    if (!address) return;
    
    setError(null);
    setSignature(null);
    setVerified(null);

    try {
      const sig = await signMessageAsync({ message });
      setSignature(sig);

      // Verify the signature
      const isValid = await verifyMessage({
        address,
        message,
        signature: sig,
      });
      setVerified(isValid);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('User rejected')) {
          setError('Signature request was rejected');
        } else if (err.message.includes('User denied')) {
          setError('Signature request was denied');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to sign message');
      }
    }
  };

  const handleReset = () => {
    setSignature(null);
    setVerified(null);
    setError(null);
  };

  if (!isConnected) {
    return (
      <div className="sign-message-empty">
        <div className="empty-icon">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <p className="empty-text">Connect your wallet to sign messages</p>
      </div>
    );
  }

  return (
    <div className="sign-message">
      {/* Message Input */}
      <div className="message-input-section">
        <label htmlFor="message" className="input-label">
          Message to Sign
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-textarea"
          placeholder="Enter a message to sign..."
          rows={3}
          disabled={isPending}
        />
      </div>

      {/* Sign Button */}
      <button
        onClick={handleSign}
        disabled={isPending || !message.trim()}
        className="sign-btn"
      >
        {isPending ? (
          <>
            <div className="btn-spinner" />
            <span>Waiting for signature...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Sign Message</span>
          </>
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Signature Result */}
      {signature && (
        <div className="signature-result">
          <div className="result-header">
            <div className="result-status">
              {verified ? (
                <>
                  <div className="status-icon success">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="status-text success">Signature Verified!</span>
                </>
              ) : (
                <>
                  <div className="status-icon failed">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="status-text failed">Verification Failed</span>
                </>
              )}
            </div>
            <button onClick={handleReset} className="reset-btn">
              Sign Another
            </button>
          </div>

          <div className="signature-details">
            <div className="detail-row">
              <span className="detail-label">Signed Message</span>
              <p className="detail-value message-value">{message}</p>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Signature</span>
              <div className="signature-container">
                <code className="signature-code">{signature}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(signature)}
                  className="copy-btn"
                  title="Copy signature"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="detail-row">
              <span className="detail-label">Signer</span>
              <code className="signer-address">{address}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
