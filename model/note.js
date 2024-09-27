const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user');

const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Define the relationship
Note.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Note;