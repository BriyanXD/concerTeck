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

// module.exports = (sequelize) => {
//   sequelize.define('usuario', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     user: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     mail: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   },{timestamps: false})
// };

// const Alumno = sequelize.define(
//   "Usuario",
//   {
//     key: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// module.exports = Alumno;
