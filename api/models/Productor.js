const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Productor = sequelize.define('productor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cuit_cuil: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mail: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  cbu: { // cuenta bancaria
    type: DataTypes.INTEGER,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
  },
},{timestamps: false});

module.exports = Productor;

// module.exports = (sequelize) => {
//   sequelize.define('productor', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastname: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     user: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     mail: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     cbu: { // cuenta bancaria
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     telephone: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     company: {
//       type: DataTypes.STRING,
//     }
//   },{timestamps: false})
// };



// const Alumno = sequelize.define(
//   "Productor",
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
