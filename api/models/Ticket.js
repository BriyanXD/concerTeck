const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  name: {
      type: DataTypes.ENUM("streaming", "campo", "vip", "campo lateral"),
      allowNull: false
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  }
},{timestamps: false});

module.exports = Ticket

