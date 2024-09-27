const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || 'be_test'
const dbUser = process.env.DB_USER || 'root'
const dbHost = process.env.DB_HOST || 'localhost'

const sequelize = new Sequelize(dbName, dbUser, '', {
    host: dbHost, // or your DB host
    dialect: 'mysql',
});

module.exports = sequelize;