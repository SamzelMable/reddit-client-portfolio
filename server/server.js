// server.js
import express from 'express';
import cors from 'cors';
import redditRoutes from './routes/redditRoutes.js';

const app = express();

// Use the port Render provides or fallback to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', redditRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
