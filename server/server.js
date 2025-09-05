import express from 'express'
import 'dotenv/config' 
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API IS WORKING"));
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

// For local development
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log('Server is running on port ' + PORT);
    });
  };
  startServer();
}

// For Vercel deployment
export default app;