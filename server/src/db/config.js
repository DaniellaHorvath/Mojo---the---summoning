// add your database connection here

const { DataTypes, Model, Sequelize } = require("sequelize");
const path = require("path");

const db = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: path.join(__dirname, '../db.sqlite')
});

module.exports = { DataTypes, Model, db}
