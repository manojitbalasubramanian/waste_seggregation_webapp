import React, { useState } from 'react';

const sampleOrders = [
  { id: 'ORD123456', item: 'Biodegradable Waste Pickup', status: 'In Transit', location: 'Sorting Facility' },
  { id: 'ORD123457', item: 'Plastic Waste Pickup', status: 'Delivered', location: 'Recycling Plant' },
  { id: 'ORD123458', item: 'E-Waste Pickup', status: 'Pending', location: 'Warehouse' },
];

export default function TrackingUpdate() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : sampleOrders;
  });
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ status: '', location: '' });

  const handleEdit = (order) => {
    setEditId(order.id);
    setForm({ status: order.status, location: order.location });
  };

  const handleSave = (id) => {
  const updated = orders.map(order => order.id === id ? { ...order, ...form } : order);
  setOrders(updated);
  localStorage.setItem('orders', JSON.stringify(updated));
  setEditId(null);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>🚚 Tracking Update (Vendor)</h1>
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
            {editId === order.id ? (
              <>
                <div>
                  <label>Status: </label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option>Pending</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                  </select>
                </div>
                <div style={{ marginTop: 8 }}>
                  <label>Location: </label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <button style={{ marginTop: 12, background: '#4caf50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }} onClick={() => handleSave(order.id)}>Save</button>
                <button style={{ marginLeft: 8, background: '#aaa', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }} onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div>Status: <span style={{ color: order.status === 'Delivered' ? 'green' : order.status === 'In Transit' ? 'orange' : 'gray', fontWeight: 700 }}>{order.status}</span></div>
                <div>Location: {order.location}</div>
                <button style={{ marginTop: 12, background: '#222', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }} onClick={() => handleEdit(order)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
