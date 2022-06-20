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
      type: DataTypes.ENUM('Rock', 'Reggae', 'Hip Hop', 'Rap', 'Clasica', 'Metal', 'Reggaeton', 'Pop', 'Electronica', 'Jazz', 'Trap'),
      allowNull: false,
    },
    schedule: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    map: {
      type: DataTypes.TEXT,
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
