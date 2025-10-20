'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ResetPasswordPage() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get('access_token');
    if (access_token) {
      supabase.auth.setSession({ access_token });
      setToken(access_token);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setDone(true);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-3">Password Updated!</h1>
        <p>You can now return to the Oneiro app and log in with your new password.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-sm w-full"
      >
        <h1 className="text-xl font-bold mb-4">Reset your password</h1>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          disabled={!token}
          className="bg-purple-600 text-white w-full py-2 rounded"
        >
          Update Password
        </button>
      </form>
    </main>
  );
}