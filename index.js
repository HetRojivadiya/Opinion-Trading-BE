const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Database/connection');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Database connection
const uri = "mongodb+srv://hetrojivadiya999:hetrojivadiya@het.ioacmg7.mongodb.net/OpinionTrading?retryWrites=true&w=majority";
connectDB(uri);

// Routes
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/check-token', require('./routes/checkToken'));

// Start the server
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
