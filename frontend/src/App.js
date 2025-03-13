import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerChat from './CustomerChat';
import SupportAgent from './SupportAgent';
import AgentLogin from './AgentLogin';

function Home() {
  return (
    <div style={styles.homeContainer}>
      <h2 style={styles.title}>Welcome</h2>
      <p>Select a view:</p>
      <Link to="/customer" style={styles.link}>Customer View</Link>
      <Link to="/agent/login" style={styles.link}>Agent Login</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />
        {/* Customer view */}
        <Route path="/customer" element={<CustomerChat />} />
        {/* Agent login view */}
        <Route path="/agent/login" element={<AgentLogin />} />
        {/* Agent view (after successful login) */}
        <Route path="/agent" element={<SupportAgent />} />
      </Routes>
    </Router>
  );
}

const styles = {
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f2f2f2',
  },
  title: {
    marginBottom: '20px',
  },
  link: {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#075E54',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
  },
};

export default App;
