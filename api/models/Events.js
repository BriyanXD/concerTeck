const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Events = sequelize.define(
  "events",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    cuit_cuil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    map: {
      type: DataTypes.STRING,
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

// module.exports = (sequelize) => {
//     sequelize.define('events', {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//       },
//       name: {
//           type: DataTypes.STRING,
//           allowNull: false
//       },
//       direction: {
//           type: DataTypes.STRING,
//           allowNull: false
//       },
//       time: {
//           type: DataTypes.TIME,
//           allowNull: false
//       },
//       cuit_cuil: {
//           type: DataTypes.INTEGER,
//           allowNull: false
//       },
//       map: {
//           type: DataTypes.GEOGRAPHY, //buscar
//       },
//       image: {
//           type: DataTypes.STRING,
//           allowNull: false
//       },
//       description: {
//           type: DataTypes.TEXT,
//       }
//     },{timestamps: false})
//   };
