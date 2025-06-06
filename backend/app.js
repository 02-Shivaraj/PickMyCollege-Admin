const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app'
}));
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files (HTML, CSS, JS)

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI ;

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
app.get('/api/', async (req, res) => {
    try {
        console.log('📊 Fetching statistics from database...');
        
        // Find the statistics document
        const stats = await Stats.find();

        // console.log(stats)
        
        if (!stats) {
            console.log('⚠️ No statistics found in database');
            return res.json({
                userCount: 0,
                collegeCount: 0
            });
        }

        // console.log(`📈 Stats fetched - Users: ${stats.user_submissions}, Colleges: ${stats.colleges_recommended}`);
       const { user_submissions: a, colleges_recommended: b, count: c } = stats[0];
        const { user_submissions: d, colleges_recommended: e, count: f } = stats[1];
        res.json({st:stats});

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
    res.sendFile(path.join(__dirname,'public','index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;