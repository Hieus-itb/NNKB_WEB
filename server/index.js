const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});