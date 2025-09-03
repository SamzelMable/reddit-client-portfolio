import express from 'express';
import cors from 'cors';
import redditRoutes from './routes/redditRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', redditRoutes);

// Health check
app.get('/', (req, res) => res.send('Reddit client backend is running ✅'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
