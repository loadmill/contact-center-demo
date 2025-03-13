import React, { useState } from 'react';
import CustomerChat from './CustomerChat';
import SupportAgent from './SupportAgent';

function App() {
  const [view, setView] = useState(null);

  if (!view) {
    return (
      <div style={styles.selectionContainer}>
        <h2 style={styles.title}>Select a View</h2>
        <button style={styles.button} onClick={() => setView('customer')}>
          Customer View
        </button>
        <button style={styles.button} onClick={() => setView('agent')}>
          Agent View
        </button>
      </div>
    );
  }

  return (
    <div>
      {view === 'customer' ? <CustomerChat /> : <SupportAgent />}
    </div>
  );
}

const styles = {
  selectionContainer: {
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
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#075E54',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default App;
