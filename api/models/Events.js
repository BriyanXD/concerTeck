const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Events = sequelize.define(
  "events",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genre:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    map: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

module.exports = Events;
