const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// In-memory message queue
const messageQueue = [];

// Middleware to log API calls
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ----------------------
// Customer Endpoints
// ----------------------

// POST /api/customer/message
// Customer sends a message. The message is added to the queue.
app.post('/api/customer/message', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }
  const message = {
    id: Date.now(), // simple unique ID using timestamp
    content,
    responses: [],
    status: 'pending', // status can be 'pending', 'responded', or 'resolved'
    createdAt: new Date().toISOString()
  };
  messageQueue.push(message);
  res.json({ message: 'Message received', conversation: message });
});

// ----------------------
// Agent Endpoints
// ----------------------

// POST /api/agent/login
// mock login api
app.post('/api/agent/login', (req, res) => {
  // We ignore the actual credentials and return success
  res.json({ success: true });
});


// GET /api/agent/messages
// Agent retrieves all pending messages.
app.get('/api/agent/messages', (req, res) => {
  const pendingMessages = messageQueue.filter(msg => msg.status === 'pending');
  res.json({ messages: pendingMessages });
});

// POST /api/agent/respond
// Agent responds to a specific message.
app.post('/api/agent/respond', (req, res) => {
  const { id, response } = req.body;
  if (!id || !response) {
    return res.status(400).json({ error: 'Message id and response are required.' });
  }
  const message = messageQueue.find(msg => msg.id == id);
  if (!message) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  // Add the agent response to the conversation
  message.responses.push({
    response,
    respondedAt: new Date().toISOString()
  });
  // Update the status to 'responded'
  message.status = 'responded';
  res.json({ message: 'Response added', conversation: message });
});

// POST /api/agent/resolve
// Agent marks a conversation as resolved.
app.post('/api/agent/resolve', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Message id is required.' });
  }
  const message = messageQueue.find(msg => msg.id == id);
  if (!message) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  message.status = 'resolved';
  res.json({ message: 'Conversation resolved', conversation: message });
});

// ----------------------
// Serve the React App
// ----------------------

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve the React app for any route not handled by API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
