import express from 'express';
import userRoutes from './routes/users.js';
import orgRoutes from './routes/organizations.js';
import ProRoutes from './routes/project.js';
const app = express();

app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/organizations', orgRoutes);
app.use('/api/pro', ProRoutes);



export default app;