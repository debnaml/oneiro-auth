'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ResetPasswordPage() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleAuthChange = async () => {
      // Check for hash parameters (password reset flow)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      console.log('Hash params:', { access_token, type });
      
      if (access_token && type === 'recovery') {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: hashParams.get('refresh_token') || ''
          });
          
          if (error) {
            console.error('Session error:', error);
            setError('Invalid or expired reset link');
          } else {
            console.log('Session set successfully:', data);
            setToken(access_token);
          }
        } catch (err) {
          console.error('Auth error:', err);
          setError('Authentication failed');
        }
      } else if (!access_token) {
        setError('No reset token found. Please use the link from your email.');
      }
    };

    handleAuthChange();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setDone(true);
  }

  if (done) {
    return (
      <div>
        <div className="glass-card w-full text-center">
          <div className="mb-6 text-4xl">🎉</div>
          <h1 className="text-2xl font-bold mb-4 text-primary">Password Updated!</h1>
          <p className="text-secondary mb-6">
            You can now return to the Oneiro app and log in with your new password.
          </p>
          <div className="text-muted text-sm">
            Your dreams await
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="glass-card w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Reset Password</h1>
        <p className="text-secondary text-center mb-6">
          Enter your new password to secure your dream journal
        </p>
        
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field mb-4"
          required
          minLength={6}
        />
        
        {error && (
          <div className="error-message mb-4 text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={!token || !password}
          className="btn-primary w-full"
        >
          {!token ? 'Loading...' : 'Update Password'}
        </button>
        
        <div className="text-muted text-center text-sm mt-4">
          Make sure your password is secure and memorable
        </div>
      </form>
    </div>
  );
}