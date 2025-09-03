import express from 'express';
import cors from 'cors';
import redditRoutes from './routes/redditRoutes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', redditRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
