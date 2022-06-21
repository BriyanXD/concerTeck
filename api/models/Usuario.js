const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Ticket = require("./Ticket");

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

//Relacion db
Usuario.hasMany(Ticket);
Ticket.belongsTo(Usuario);

module.exports = Usuario;


