
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const quotes = [
  "The greatest threat to our planet is the belief that someone else will save it. – Robert Swan",
  "Waste isn’t waste until we waste it. – Will.I.Am",
  "Small acts, when multiplied by millions, can transform the world. – Howard Zinn",
  "Sustainability is not a choice, it’s a responsibility.",
  "Be the change you wish to see in the world. – Mahatma Gandhi"
];

const features = [
  { icon: "♻️", title: "Waste Segregation Guide", desc: "Learn how to sort your waste for a cleaner planet." },
  { icon: "🏆", title: "Earn Green Points", desc: "Get rewarded for eco-friendly actions and redeem for perks." },
  { icon: "🚚", title: "Track Your Pickups", desc: "Real-time updates on your waste collection and recycling." },
  { icon: "📊", title: "Eco Analytics", desc: "See your impact and progress towards sustainability goals." }
];

export default function Home() {
  const { authUser } = useContext(AuthContext);
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx(idx => (idx + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #c8e6c9 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
    }}>
      <div style={{ maxWidth: 600, textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#388e3c', marginBottom: 12 }}>Zero Waste, Infinite Impact</h1>
        <div style={{ fontSize: 20, fontStyle: 'italic', color: '#222', marginBottom: 18, minHeight: 48 }}>
          {quotes[quoteIdx]}
        </div>
        {authUser && authUser.username && (
          <div style={{ fontSize: 22, color: '#00796b', fontWeight: 600, marginTop: 8 }}>Welcome, {authUser.username}!</div>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginTop: 16 }}>
        {features.map(f => (
          <div key={f.title} style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 24px #2222',
            padding: '2rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            transition: 'transform 0.2s',
          }}>
            <span style={{ fontSize: 38 }}>{f.icon}</span>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#388e3c' }}>{f.title}</div>
            <div style={{ fontSize: 15, color: '#444', textAlign: 'center' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}