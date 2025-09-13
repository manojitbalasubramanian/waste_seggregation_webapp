export default function Footer() {
  return (
    <footer style={{
      padding: 20,
      background: '#222',
      color: '#fff',
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      zIndex: 100
    }}>
      <span role="img" aria-label="recycle" style={{ fontSize: 28 }}>♻️</span>
      <span style={{ fontSize: 16, fontWeight: 500 }}>
        Sustainability Tip: Reduce, Reuse, Recycle! Every small action counts toward a greener planet.
      </span>
    </footer>
  );
}