const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '..','frontend'))); // Serve static files (HTML, CSS, JS)

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/admin';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
});

// MongoDB Schema for Statistics
const statsSchema = new mongoose.Schema({
    user_submissions: {
        type: Number,
        required: true,
        default: 0
    },
    colleges_recommended: {
        type: Number,
        required: true,
        default: 0
    }
});

// Create model
const Stats = mongoose.model('counters', statsSchema,'counters');

// API endpoint to get statistics (only GET operation)
app.get('/api', async (req, res) => {
    try {
        console.log('📊 Fetching statistics from database...');
        
        // Find the statistics document
        const stats = await Stats.findOne();

        console.log(stats)
        
        if (!stats) {
            console.log('⚠️ No statistics found in database');
            return res.json({
                userCount: 0,
                collegeCount: 0
            });
        }

        console.log(`📈 Stats fetched - Users: ${stats.user_submissions}, Colleges: ${stats.colleges_recommended}`);
        
        res.json({
            userCount: stats.user_submissions,
            collegeCount: stats.colleges_recommended
        });

    } catch (error) {
        console.error('❌ Error fetching statistics:', error);
        res.status(500).json({
            userCount: 0,
            collegeCount: 0
        });
    }
});

// Serve the main HTML file (admin dashboard)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','frontend', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin dashboard available at http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
});