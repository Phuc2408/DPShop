const express = require('express')
const { connectMongoDB } = require('./config/db.js');
const passport = require('passport');
const app = express()
const cors = require('cors')
const path = require('path');
const api_Routes = require('./routes/api/routes.js');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
require('./config/passport.js');

port = 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//Database connection
connectMongoDB();

app.use('/api', api_Routes);


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
})

module.exports = app

