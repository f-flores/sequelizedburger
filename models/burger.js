// ================================================================================
//
// File name: burger.js
// Description: This file contains the database model for the burger app.
//
// ================================================================================

module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    "burger_name": {
      "type": DataTypes.STRING,
      "allowNull": false,
      "validate": {"len": [2]}
    },
    "devoured": {
      "type": DataTypes.BOOLEAN,
      "allowNull": false,
      "defaultValue": false
    }
  });

  return Burger;
};