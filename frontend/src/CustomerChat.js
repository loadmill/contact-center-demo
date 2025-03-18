import React, { useState } from 'react';

const CustomerChat = () => {
  // Get company from localStorage or default to "Loadmill"
  const company = localStorage.getItem('company') || 'Loadmill';
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (message.trim() === '') return;

    try {
      const response = await fetch('/api/customer/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        const newMsg = {
          text: data.conversation.content,
          sender: 'customer',
          time: new Date(data.conversation.createdAt).toLocaleTimeString(),
        };
        setChatHistory([...chatHistory, newMsg]);
        setMessage('');
      } else {
        alert(data.error || 'Error sending message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <img
            src="/logo192.png"
            alt={`${company} Support`}
            style={styles.avatar}
          />
          <span style={styles.headerText}>{company} Support</span>
        </div>
        <div style={styles.mockButtons}>
          <button style={styles.iconButton} title="Upload File">
            {/* File Upload Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </button>
          <button style={styles.iconButton} title="Open Camera">
            {/* Camera Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M12 5c-3.86 0-7 3.14-7 7 0 3.86 3.14 7 7 7 3.86 0 7-3.14 7-7 0-3.86-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
              <circle cx="12" cy="12" r="2.5" />
              <path d="M20 4h-3.17l-1.84-2H8.99L7.15 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12z" />
            </svg>
          </button>
        </div>
      </div>
      <div style={styles.chatArea}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === 'customer' ? styles.customerMsg : styles.agentMsg}
          >
            <span>{msg.text}</span>
            <div style={styles.timeStamp}>{msg.time}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton} title="Send Message">
          {/* Send Icon: Paper plane */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#075E54',
    color: '#fff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  headerText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  mockButtons: {
    display: 'flex',
    gap: '10px',
  },
  iconButton: {
    backgroundColor: '#25D366',
    border: 'none',
    padding: '5px',
    borderRadius: '50%',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatArea: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#e5ddd5',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  customerMsg: {
    backgroundColor: '#dcf8c6',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    alignSelf: 'flex-end',
    maxWidth: '70%',
  },
  agentMsg: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  timeStamp: {
    fontSize: '10px',
    textAlign: 'right',
    marginTop: '5px',
  },
  inputArea: {
    display: 'flex',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: 'none',
    outline: 'none',
  },
  sendButton: {
    padding: '10px',
    border: 'none',
    backgroundColor: '#075E54',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CustomerChat;
