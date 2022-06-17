const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ticked = sequelize.define('ticked', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
  name: {
      type: DataTypes.ENUM("estandar", "striming", "bronce", "silver", "golden", "premium"),
      allowNull: false
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  }
},{timestamps: false});

module.exports = Ticked

// module.exports = (sequelize) => {
//     sequelize.define('ticked', {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true
//           },
//       name: {
//           type: DataTypes.ENUM("estandar", "striming", "bronce", "silver", "golden", "premium"),
//           allowNull: false
//       },
//       price: {
//           type: DataTypes.FLOAT,
//           allowNull: false
//       }
//     },{timestamps: false})
//   };