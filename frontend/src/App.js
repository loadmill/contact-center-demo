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

  const company = searchParams.get('company') || 'Loadmill';

  return (
    <div style={styles.homeContainer}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to {company} Support</h1>
        <p style={styles.heroSubtitle}>
          Need help? Our support agents are here for you 24/7.
        </p>
        <Link reloadDocument to="/customer" style={styles.ctaButton}>Start a Chat</Link>
      </div>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Live Chat Support</h2>
          <p>Chat with a support agent in real-time for immediate assistance.</p>
          <Link reloadDocument to="/customer" style={styles.cardButton}>Start Chat</Link>
        </div>
        <div style={styles.card}>
          <h2>Agent Dashboard</h2>
          <p>Log in to manage customer requests and provide support.</p>
          <Link reloadDocument to="/agent/login" style={styles.cardButton}>Agent Login</Link>
        </div>
      </div>
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
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  heroSection: {
    width: '100vw',
    height: '40vh', // Adjust based on preference
    backgroundColor: '#075E54',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  ctaButton: {
    backgroundColor: '#FF9800',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: '0.3s',
  },
  ctaButtonHover: {
    backgroundColor: '#e68900',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    marginTop: '40px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '300px',
  },
  cardButton: {
    marginTop: '10px',
    display: 'inline-block',
    backgroundColor: '#00796B',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: '6px',
    textDecoration: 'none',
  },
};


export default App;
