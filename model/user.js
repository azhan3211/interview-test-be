const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures username is unique
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Method to create a new user
User.createUser = async (email, password, first_name, last_name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashedPassword, first_name, last_name });
};

// Method to find a user by username
User.findByEmail = async (email) => {
    return User.findOne({ where: { email } });
};

// Method to generate a JWT token
User.generateAuthToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
    });
    return token;
};

module.exports = User;