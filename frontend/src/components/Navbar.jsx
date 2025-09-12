import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

export default function Navbar() {
  const { authUser } = useContext(AuthContext);
  const { logout, loading } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ padding: 20, background: '#222', color: '#fff', display: 'flex', gap: 20 }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 20, alignItems: 'center' }}>
        {authUser && authUser.username ? (
          <>
            <span style={{ marginRight: 20 }}>Welcome, {authUser.username}</span>
            <button 
              onClick={handleLogout}
              disabled={loading}
              style={{
                padding: '8px 16px',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}