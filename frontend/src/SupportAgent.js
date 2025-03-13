import React, { useEffect, useState } from 'react';

const SupportAgent = () => {
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState({});

  // Poll for messages every 5 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/agent/messages');
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      } else {
        console.error('Error fetching messages:', data.error);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const sendResponse = async (id) => {
    if (!responses[id] || responses[id].trim() === '') {
      alert('Please enter a response.');
      return;
    }
    try {
      const res = await fetch('/api/agent/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, response: responses[id].trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        // Clear response input for this message
        setResponses(prev => ({ ...prev, [id]: '' }));
        fetchMessages();
      } else {
        alert(data.error || 'Error sending response.');
      }
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Error sending response.');
    }
  };

  const resolveConversation = async (id) => {
    try {
      const res = await fetch('/api/agent/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchMessages();
      } else {
        alert(data.error || 'Error resolving conversation.');
      }
    } catch (error) {
      console.error('Error resolving conversation:', error);
      alert('Error resolving conversation.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <aside style={styles.sidebar}>
        {/* Top section (logo + nav) */}
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarHeader}>
            <img src="/logo192.png" alt="Company Logo" style={styles.logo} />
            <h3 style={styles.companyName}>HK Telecom Support</h3>
          </div>
          <nav style={styles.nav}>
            <ul style={styles.menuList}>
              <li style={styles.menuItemActive}>
                <span style={styles.menuIcon}>
                  {/* Dashboard Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    fill="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </span>
                Dashboard
              </li>
              <li style={styles.menuItem}>
                <span style={styles.menuIcon}>
                  {/* Reports Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    fill="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 2h16v20H4z" fill="none" />
                    <path d="M4 2v20h16V2H4zm14 2v3H6V4h12zM6 8h12v3H6V8zm0 5h12v3H6v-3zm0 5h12v2H6v-2z" />
                  </svg>
                </span>
                Reports
              </li>
              <li style={styles.menuItem}>
                <span style={styles.menuIcon}>
                  {/* Settings Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    fill="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.39.12-.59l-1.92-3.32a.46.46 0 0 0-.57-.19l-2.39.96a7.1 7.1 0 0 0-1.63-.94l-.36-2.54A.46.46 0 0 0 14.5 2h-5a.46.46 0 0 0-.45.38l-.36 2.54c-.6.25-1.16.57-1.64.94l-2.38-.96a.46.46 0 0 0-.57.19L2.18 8.41c-.11.2-.06.45.12.59l2.03 1.58c-.05.3-.07.64-.07.94s.02.64.07.94L2.23 13.5c-.18.14-.23.39-.12.59l1.92 3.32c.11.2.36.27.57.19l2.39-.96c.48.37 1.04.69 1.63.94l.36 2.54c.03.22.22.38.45.38h5c.23 0 .42-.16.45-.38l.36-2.54c.59-.25 1.15-.57 1.63-.94l2.39.96c.21.08.46.01.57-.19l1.92-3.32a.46.46 0 0 0-.12-.59l-2.04-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" />
                  </svg>
                </span>
                Settings
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer pinned at bottom */}
        <div style={styles.sidebarFooter}>
          <a href="#" style={styles.footerLink}>Help</a>
          <a href="#" style={styles.footerLink}>Contact</a>
        </div>
      </aside>

      <div style={styles.mainArea}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>Support Dashboard</h2>
        </header>

        <div style={styles.content}>
          {messages.length === 0 ? (
            <p>No pending messages.</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} style={styles.messageCard}>
                <div style={styles.messageContent}>
                  <strong>Message:</strong> {msg.content}
                </div>
                <div style={styles.messageTime}>
                  <strong>Received:</strong> {new Date(msg.createdAt).toLocaleString()}
                </div>
                {msg.responses && msg.responses.length > 0 && (
                  <div style={styles.responses}>
                    <strong>Responses:</strong>
                    <ul>
                      {msg.responses.map((resp, idx) => (
                        <li key={idx}>
                          {resp.response}{' '}
                          <em>({new Date(resp.respondedAt).toLocaleTimeString()})</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={styles.responseArea}>
                  <input
                    type="text"
                    placeholder="Type your response"
                    value={responses[msg.id] || ''}
                    onChange={e => handleResponseChange(msg.id, e.target.value)}
                    style={styles.responseInput}
                  />
                  <button onClick={() => sendResponse(msg.id)} style={styles.actionButton}>
                    Send Response
                  </button>
                  <button onClick={() => resolveConversation(msg.id)} style={styles.resolveButton}>
                    Mark as Resolved
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    margin: 0,
    padding: 0,
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    // Removed justifyContent: 'space-between'
    padding: '20px',
  },
  sidebarTop: {
    // Container for logo + nav
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  companyName: {
    marginTop: '10px',
    fontSize: '18px',
    textAlign: 'center',
  },
  nav: {
    // Menu is right under the header
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuIcon: {
    marginRight: '10px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  menuItemActive: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#34495e',
    borderRadius: '5px',
    borderLeft: '5px solid #00bfff', // highlight color on the left
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  sidebarFooter: {
    marginTop: 'auto', // pins this footer to the bottom
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  footerLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'not-allowed',
    opacity: 0.8,
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#004080',
    color: '#fff',
    padding: '15px 20px',
  },
  headerTitle: {
    margin: 0,
    fontSize: '20px',
  },
  content: {
    padding: '20px',
    overflowY: 'auto',
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  messageContent: {
    marginBottom: '8px',
  },
  messageTime: {
    marginBottom: '8px',
    fontSize: '12px',
    color: '#666',
  },
  responses: {
    marginBottom: '8px',
  },
  responseArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  responseInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  },
  actionButton: {
    padding: '8px 12px',
    backgroundColor: '#0062cc',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  resolveButton: {
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default SupportAgent;
