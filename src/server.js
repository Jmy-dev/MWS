import "dotenv/config";
import express from 'express';
import { setCorrelationId } from './common/correlation/correlationId.js';
import { requestTimer } from './common/requestTimer/requestTimer.js';
import errorHandler from './common/error/errorHandler.js';
import { connectDB } from './common/db/db.js';
import userRoutes from './app/user/routes.js';
import patchRoutes from './app/Patch/routes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
// Middleware
app.use(setCorrelationId);
app.use(requestTimer());
app.use(cors());
// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/users', userRoutes);
app.use('/api/patches', patchRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

try {
  await connectDB(); // <-- ensure live connection
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
} catch (err) {
  console.error("Mongo connect failed:", err);
  process.exit(1);
}

export default app;