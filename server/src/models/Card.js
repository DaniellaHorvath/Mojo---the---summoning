const { DataTypes, Model, db } = require("../db/config.js");
const path = require("path");

class Card extends Model {}

Card.init({
    name: DataTypes.TEXT,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT

}, {
    sequelize: db

})

module.exports = { Card }