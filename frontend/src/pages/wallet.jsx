import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Wallet() {
  const { authUser } = useContext(AuthContext);
  const cardNumber = authUser?.cardNumber || '0000 0000 0000 0000';
  const userName = authUser?.username || 'User Name';
  const points = typeof authUser?.points === 'number' ? authUser.points : 0;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>👛 Wallet</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <div style={{
          width: 340,
          height: 200,
          borderRadius: 20,
          background: 'linear-gradient(135deg, #4caf50 60%, #222 100%)',
          color: '#fff',
          boxShadow: '0 4px 24px #2224',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative'
        }}>
          <div style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: 2 }}>Waste Segregation Card</div>
          <div style={{
            margin: '16px 0',
            width: '100%',
            borderBottom: '2px solid #fff',
            paddingBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: 28, letterSpacing: 3 }}>{cardNumber.replace(/(.{4})/g, '$1 ')}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 500 }}>{userName.toUpperCase()}</div>
          <div style={{ fontSize: 16, fontWeight: 400, marginTop: 8 }}>Points: <span style={{ fontWeight: 700 }}>{points}</span></div>
          <div style={{ position: 'absolute', bottom: 18, right: 24, fontSize: 32 }}>💳</div>
        </div>
      </div>
    </div>
  );
}