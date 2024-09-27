const User = require('../model/user')
const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
        try {
            const { email, password, first_name, last_name } = req.body;
            const user = await User.createUser(email, password, first_name, last_name);

            // Generate JWT token
            const accessToken = User.generateAuthToken(user);

            res.status(201).json({ message: 'User created successfully', data: user, accessToken });
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const accessToken = User.generateAuthToken(user);

            res.status(200).json({ message: 'Login successful', user, accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    profile: async (req, res) => {
        try {
            const { email } = req.user;

            const user = await User.findByEmail(email);

            res.status(200).json({ message: 'Profile successful', user })

        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message })
        }
    }
};

module.exports = userController;