import React, { useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:1234/users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>👥 User List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 32 }}>
        <thead>
          <tr style={{ background: '#4caf50', color: '#fff' }}>
            <th style={{ padding: '12px 8px', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '12px 8px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px 8px', border: '1px solid #ddd' }}>Card Number</th>
            <th style={{ padding: '12px 8px', border: '1px solid #ddd' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(u => u.isUser).map(user => (
            <tr key={user._id} style={{ background: '#f9f9f9' }}>
              <td style={{ padding: '10px 8px', border: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '10px 8px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px 8px', border: '1px solid #ddd' }}>{user.cardNumber}</td>
              <td style={{ padding: '10px 8px', border: '1px solid #ddd' }}>{user.isAdmin ? 'Admin' : user.isVendor ? 'Vendor' : 'User'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
