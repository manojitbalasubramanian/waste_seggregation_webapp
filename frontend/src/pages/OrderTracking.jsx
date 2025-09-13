import React from 'react';

const sampleOrders = [
  {
    id: 'ORD123456',
    item: 'Biodegradable Waste Pickup',
    status: 'In Transit',
    expected: 'Sep 15, 2025',
    location: 'Sorting Facility',
  },
  {
    id: 'ORD123457',
    item: 'Plastic Waste Pickup',
    status: 'Delivered',
    expected: 'Sep 10, 2025',
    location: 'Recycling Plant',
  },
  {
    id: 'ORD123458',
    item: 'E-Waste Pickup',
    status: 'Pending',
    expected: 'Sep 18, 2025',
    location: 'Warehouse',
  },
];

export default function OrderTracking() {
  const [orders, setOrders] = React.useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : sampleOrders;
  });
  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>📦 Order Tracking</h1>
      <div style={{ marginTop: 32 }}>
        {orders.map(order => (
          <div key={order.id} style={{
            background: '#f4f4f4',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: 24,
            boxShadow: '0 2px 8px #2222',
          }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Order ID: {order.id}</div>
            <div style={{ margin: '8px 0', fontSize: 16 }}>Item: <b>{order.item}</b></div>
            <div>Status: <span style={{ color: order.status === 'Delivered' ? 'green' : order.status === 'In Transit' ? 'orange' : 'gray', fontWeight: 700 }}>{order.status}</span></div>
            <div>Expected Delivery: {order.expected}</div>
            <div>Current Location: {order.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
