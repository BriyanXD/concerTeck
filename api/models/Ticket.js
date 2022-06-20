const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Events = require("./Events");

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
<<<<<<< HEAD
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(
        "estandar",
        "streaming",
        "bronce",
        "silver",
        "golden",
        "premium"
      ),
      allowNull: false,
    },
    price: {
=======
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  name: {
      type: DataTypes.ENUM("estandar", "streaming", "bronce", "silver", "golden", "premium"),
      allowNull: false
  },
  price: {
>>>>>>> develop
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

//
Events.hasMany(Ticket);
Ticket.belongsTo(Events);

module.exports = Ticket;

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
