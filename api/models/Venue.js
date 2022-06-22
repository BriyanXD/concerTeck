const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Venue = sequelize.define("venue", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
  maxStockkVIP: {
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
});

module.exports = Venue;
