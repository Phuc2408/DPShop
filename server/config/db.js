const mongoose = require('mongoose');
const { Pool } = require('pg')
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); 
//PostgreSQL connection
const pgPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

//MongoDB connection
async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = { pgPool, connectMongoDB };