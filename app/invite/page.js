'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function InvitePage() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleInviteFlow = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      console.log('Invite params:', { access_token, type });
      
      if (access_token && type === 'invite') {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: hashParams.get('refresh_token') || ''
          });
          
          if (error) {
            console.error('Session error:', error);
            setError('Invalid or expired invitation link');
          } else {
            console.log('Session set successfully:', data);
            setToken(access_token);
            setEmail(data.user?.email || '');
          }
        } catch (err) {
          console.error('Auth error:', err);
          setError('Authentication failed');
        }
      } else {
        setError('No invitation token found. Please use the link from your email.');
      }
    };

    handleInviteFlow();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
      } else {
        setDone(true);
      }
    } catch (err) {
      setError('Failed to set password');
    }
  }

  if (done) {
    return (
      <div>
        <div className="glass-card w-full text-center">
          <div className="mb-6 text-4xl">🎉</div>
          <h1 className="text-2xl font-bold mb-4 text-primary">Welcome to Oneiro!</h1>
          <p className="text-secondary mb-6">
            Your account has been set up successfully. You can now log in to start your dream journey.
          </p>
          <div className="text-muted text-sm">
            Time to capture your dreams
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="glass-card w-full">
        <div className="text-center mb-6">
          <div className="mb-4 text-3xl">✨</div>
          <h1 className="text-2xl font-bold mb-2 text-primary">Complete Your Invitation</h1>
          <p className="text-secondary">
            Welcome to Oneiro! Set up your password to start your dream journal.
          </p>
          {email && (
            <p className="text-muted text-sm mt-2">
              Setting up account for: {email}
            </p>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
            />
          </div>
          
          {error && (
            <div className="error-message text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={!token || !password || !confirmPassword}
            className="btn-primary w-full"
          >
            {!token ? 'Loading...' : 'Complete Setup'}
          </button>
          
          <div className="text-muted text-center text-sm mt-4">
            Create a secure password to protect your dreams
          </div>
        </form>
      </div>
    </div>
  );
}