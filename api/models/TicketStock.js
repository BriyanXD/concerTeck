const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TicketStock = sequelize.define("ticketstock", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  stockStreaming: {
    type: DataTypes.INTEGER,
  },
  stockkVIP: {
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
  StreamingPrice: {
    type: DataTypes.FLOAT,
  },
  vipPrice: {
    type: DataTypes.FLOAT,
  },
  generalLateralPrice: {
    type: DataTypes.FLOAT,
  },
  generalPrice: {
    type: DataTypes.FLOAT,
  },
  palcoPrice: {
    type: DataTypes.FLOAT,
  },
});

module.exports = TicketStock;
