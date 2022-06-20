const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  name: {
      type: DataTypes.ENUM("estandar", "streaming", "bronce", "silver", "golden", "premium"),
      allowNull: false
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  }
},{timestamps: false});

module.exports = Ticket

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