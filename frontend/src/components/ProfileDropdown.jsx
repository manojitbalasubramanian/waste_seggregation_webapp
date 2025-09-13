import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({ authUser, logout, loading }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <img
        src={authUser.profileImg || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authUser.username)}
        alt="Profile"
        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', background: '#fff', border: '2px solid #4caf50', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div style={{ position: 'absolute', top: 40, right: 0, background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 8px #2222', minWidth: 140, zIndex: 100 }}>
          {authUser?.isUser && (
            <button
              style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => { setOpen(false); navigate('/wallet'); }}
            >
              <span role="img" aria-label="wallet">👛</span> Wallet
            </button>
          )}
          <button
            style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#aaa' : '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={logout}
            disabled={loading}
          >
            <span role="img" aria-label="logout">🚪</span> {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  );
}

