const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Database/model/users');

router.post('/', async (req, res) => {
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

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
