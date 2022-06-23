const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Events = require("../models/Events");

const Venue = sequelize.define(
  "venue",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    map: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxStockStreaming: {
      type: DataTypes.INTEGER,
    },
    maxStockVIP: {
      type: DataTypes.INTEGER,
    },
    maxStockGeneralLateral: {
      type: DataTypes.INTEGER,
    },
    maxStockGeneral: {
      type: DataTypes.INTEGER,
    },
    maxStockPalco: {
      type: DataTypes.INTEGER,
    },
    isBigEvent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);
Venue.hasMany(Events, { as: "venue" });
Events.belongsTo(Venue, { as: "venue" });

module.exports = Venue;
