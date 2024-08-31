import express from 'express';
import cors from 'cors';
import feedbackRoutes from './routes/feedbackRoutes.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // Parse incoming JSON requests

// Use the routes defined
app.use('/api', feedbackRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
