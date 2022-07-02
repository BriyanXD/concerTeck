const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const ShoppingCart = sequelize.define(
  "shoppingcart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idEvent: {
      type: DataTypes.UUID,
    },

    idUser: {
      type: DataTypes.UUID,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    shedule: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ShoppingCart;
