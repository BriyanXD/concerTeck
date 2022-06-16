const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Alumno = sequelize.define(
  "Productor",
  {
    key: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Alumno;
