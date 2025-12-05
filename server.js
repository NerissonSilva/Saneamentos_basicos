const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/dashboard', async (req, res) => {
  // Mock data for now, will replace with DB calls later
  res.json({
    stats: {
      users: 150,
      revenue: 12500,
      activeSessions: 45
    },
    recentActivity: [
      { id: 1, action: 'User Login', time: '10:00 AM' },
      { id: 2, action: 'New Order', time: '10:15 AM' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
