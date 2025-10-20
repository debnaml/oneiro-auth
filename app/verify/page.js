'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function VerifyPage() {
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get('access_token');
    if (access_token) {
      supabase.auth.setSession({ access_token });
      setStatus('Email verified! You can now log in to Oneiro.');
    } else {
      setStatus('Invalid or expired link.');
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">{status}</h1>
      <p className="text-gray-600">
        You may safely close this window and return to your Oneiro app.
      </p>
    </main>
  );
}