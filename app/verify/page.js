'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function VerifyPage() {
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const handleEmailVerification = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      console.log('Verify params:', { access_token, type });
      
      if (access_token && type === 'signup') {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: hashParams.get('refresh_token') || ''
          });
          
          if (error) {
            console.error('Verification error:', error);
            setStatus('Verification failed. Please try again.');
          } else {
            console.log('Email verified successfully:', data);
            setStatus('Email verified! You can now log in to Oneiro.');
          }
        } catch (err) {
          console.error('Auth error:', err);
          setStatus('Verification failed. Please try again.');
        }
      } else {
        setStatus('Invalid or expired verification link.');
      }
    };

    handleEmailVerification();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="glass-card w-full text-center">
        <div className="mb-6 text-4xl">
          {status.includes('verified') ? '✨' : status.includes('Invalid') ? '❌' : '⏳'}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-primary">{status}</h1>
        <p className="text-secondary mb-6">
          You may safely close this window and return to your Oneiro app.
        </p>
        <div className="text-muted text-sm">
          Continue capturing your dreams
        </div>
      </div>
    </div>
  );
}