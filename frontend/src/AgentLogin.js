import React, { useState } from 'react';

function AgentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/agent/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Force a full page reload, triggering a network request
        window.location.href = '/agent';
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Agent Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        <p style={styles.note}>
          You can use any password to log in.
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#f9f9f9',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  loginBox: {
    width: '360px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #2c3e50',
    padding: '30px 40px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#004080',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'left',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#2c3e50',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5px',
  },
  input: {
    marginTop: '5px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    marginTop: '10px',
    padding: '12px',
    backgroundColor: '#004080',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  note: {
    marginTop: '15px',
    fontSize: '12px',
    color: '#777',
  },
};

export default AgentLogin;
