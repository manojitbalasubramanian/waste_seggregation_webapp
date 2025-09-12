import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { authUser } = useContext(AuthContext);
  return (
    <div style={{padding: 40, textAlign: 'center'}}>
      <h1>Home Page</h1>
      {authUser && authUser.username && (
        <h2>Welcome, {authUser.username}!</h2>
      )}
    </div>
  );
}