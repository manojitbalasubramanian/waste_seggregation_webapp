import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
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
            {authUser.isUser && (
              <>
                <Link to="/zerowaste" style={{ color: '#fff', textDecoration: 'none' }}>Waste Segregator</Link>
                <Link to="/order-tracking" style={{ color: '#fff', textDecoration: 'none' }}>Order Tracking</Link>
              </>
            )}
            {authUser.isVendor && (
              <>
                <Link to="/user-list" style={{ color: '#fff', textDecoration: 'none' }}>User List</Link>
                <Link to="/tracking-update" style={{ color: '#fff', textDecoration: 'none' }}>Tracking Update</Link>
              </>
            )}
            <div style={{ position: 'relative', marginRight: 20, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Welcome, {authUser.username}
              <ProfileDropdown authUser={authUser} logout={handleLogout} loading={loading} />
            </div>
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