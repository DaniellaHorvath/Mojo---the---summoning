// create your User model here
const { DataTypes, Model, db } = require("../db/config.js");
const path = require("path");

class User extends Model{}

User.init({
    username: DataTypes.TEXT
}, {
    sequelize: db
})


module.exports = { User }
