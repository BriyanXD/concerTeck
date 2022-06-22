const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Producer = require("./Producer");

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
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isBigEvent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    map: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    performerImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    placeImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stockStreaming: {
      type: DataTypes.INTEGER,
    },
    stockVIP: {
      type: DataTypes.INTEGER,
    },
    stockGeneralLateral: {
      type: DataTypes.INTEGER,
    },
    stockGeneral: {
      type: DataTypes.INTEGER,
    },
    stockPalco: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

Producer.hasMany(Events);
Events.belongsTo(Producer);

module.exports = Events;
