const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};