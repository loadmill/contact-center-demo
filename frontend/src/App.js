import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import CustomerChat from './CustomerChat';
import SupportAgent from './SupportAgent';
import AgentLogin from './AgentLogin';

function Home() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const companyFromUrl = searchParams.get('company');
    if (companyFromUrl) {
      localStorage.setItem('company', companyFromUrl);
    }
  }, [searchParams]);

  return (
    <div style={styles.homeContainer}>
      <h2 style={styles.title}>Welcome</h2>
      <p>Select a view:</p>
      <Link reloadDocument to="/customer" style={styles.link}>Customer View</Link>
      <Link reloadDocument to="/agent/login" style={styles.link}>Agent Login</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerChat />} />
        <Route path="/agent/login" element={<AgentLogin />} />
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
