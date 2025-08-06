const express = require('express')
const { connectMongoDB } = require('./config/db.js'); 
const api_Routes = require('./routes/api/index.js');
const passport = require('passport'); 
const app = express()
const cors = require('cors')
const corsOption = {
  origin: ['http://localhost:5173'],
};
require('./config/passport.js');

port = 5000;

//Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(passport.initialize()); 

//Database connection
connectMongoDB();

app.use('/api', api_Routes);


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
})

module.exports = app
