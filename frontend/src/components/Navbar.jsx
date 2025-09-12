import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { authUser } = useContext(AuthContext);
  return (
    <nav style={{ padding: 20, background: '#222', color: '#fff', display: 'flex', gap: 20 }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 20, alignItems: 'center' }}>
        {authUser && authUser.username && (
          <span style={{ marginRight: 20 }}>Welcome, {authUser.username}</span>
        )}
        {!(authUser && authUser.token) && (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}