const { DataTypes, Model, db } = require("../db/config.js");
const path = require("path");

class Deck extends Model {}

Deck.init({
    name: DataTypes.TEXT,
    xp: DataTypes.INTEGER

}, {
    sequelize: db
})

module.exports = { Deck }