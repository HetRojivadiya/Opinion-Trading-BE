const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const connectDB = require("./Database/connection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());


const uri =
  "mongodb+srv://hetrojivadiya999:hetrojivadiya@het.ioacmg7.mongodb.net/OpinionTrading?retryWrites=true&w=majority";
connectDB(uri);


const User = require("./Database/model/users");






// Signup route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error during signup:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


//Login Route
app.post('/login', async (req, res) => {
const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
  
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });



  
  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });