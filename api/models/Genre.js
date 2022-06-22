const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Events = require("../models/Events")


const Genre = sequelize.define(
  "genre",
  {
    id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }, 
  },
  { timestamps: false }
);

Events.hasMany(Genre);
Genre.belongsTo(Events);

module.exports = Genre;
