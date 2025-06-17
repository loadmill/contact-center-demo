import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';

const Login = () => {
  const [role, setRole] = useState('maker');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      navigate(`/${data.role}`);
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <AppLayout>
      <div style={styles.loginBox}>
        <h2 style={{ color: '#174c86', fontWeight: 600, marginBottom: 25 }}>Banking Approval Demo Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.row}>
            <label style={styles.label}>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={styles.input}>
              <option value="maker">Maker (Finance Officer)</option>
              <option value="checker">Checker (Finance Manager)</option>
            </select>
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Username</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <div style={styles.demo}>
          Demo users:
          <div><b>maker</b> / <b>maker</b></div>
          <div><b>checker</b> / <b>checker</b></div>
        </div>
      </div>
    </AppLayout>
  );
};

const styles = {
  loginBox: {
    margin: '40px auto',
    maxWidth: 350,
    background: '#f6faff',
    border: '1px solid #d6e2ef',
    borderRadius: 10,
    boxShadow: '0 2px 12px rgba(60,100,140,0.04)',
    padding: '40px 32px'
  },
  row: {
    marginBottom: 18
  },
  label: {
    display: 'block',
    color: '#235f99',
    fontWeight: 500,
    marginBottom: 5,
    fontSize: 15
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #b2c9de',
    borderRadius: 5,
    fontSize: 15,
    marginBottom: 3,
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '11px 0',
    background: 'linear-gradient(90deg, #1e599e 60%, #2575bc 100%)',
    color: '#fff',
    fontWeight: 600,
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    letterSpacing: 1,
    cursor: 'pointer',
    marginTop: 10
  },
  demo: {
    marginTop: 22,
    color: '#888',
    fontSize: 14,
    lineHeight: 1.5
  }
};

export default Login;
