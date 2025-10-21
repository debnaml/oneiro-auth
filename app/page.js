'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [urlInfo, setUrlInfo] = useState('');

  useEffect(() => {
    // Debug information to help troubleshoot
    const hash = window.location.hash;
    const search = window.location.search;
    const pathname = window.location.pathname;
    
    setUrlInfo(`Path: ${pathname}, Hash: ${hash}, Search: ${search}`);
    
    // If there are auth parameters, redirect appropriately
    const hashParams = new URLSearchParams(hash.substring(1));
    const type = hashParams.get('type');
    
    if (type === 'recovery') {
      window.location.href = '/reset-password' + hash;
    } else if (type === 'signup') {
      window.location.href = '/verify' + hash;
    } else if (type === 'invite') {
      window.location.href = '/invite' + hash;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="glass-card w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">Auth Portal</h1>
        <p className="text-secondary text-lg mb-8">
          Secure authentication for your Oneiro dream journal
        </p>
        <div className="space-y-4 text-sm">
          <div className="feature-item">Email verification</div>
          <div className="feature-item">Password reset</div>
          <div className="feature-item">User invitations</div>
          <div className="feature-item">Secure authentication</div>
        </div>
        <div className="mt-8 text-muted text-sm">
          Continue your dream journey securely
        </div>
        {urlInfo && (
          <div className="mt-4 text-xs text-muted bg-black bg-opacity-20 p-2 rounded">
            Debug: {urlInfo}
          </div>
        )}
      </div>
    </div>
  );
}