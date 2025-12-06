const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5432;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});


app.get('/api/dashboard', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({
      stats: {
        users: userCount,
        revenue: 12500, // Still mock for now as we don't have revenue model yet
        activeSessions: 45
      },
      recentActivity: [
        { id: 1, action: 'User Login', time: '10:00 AM' },
        { id: 2, action: 'New Order', time: '10:15 AM' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
