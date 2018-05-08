// ================================================================================
//
// File name: burger.js
// Description: This file contains the database model for the burger app.
//   Based on solution in class activity source:
// https://github.com/RutgersCodingBootcamp/RUTSOM201801FSF4-Class-Repository-FSF/blob/master/14-handlebars/1-Class-Content/14.3/Activities/18-CatsApp/Solved/models/cat.js
//
// ================================================================================

// Import ORM module
var orm = require("../config/orm.js");

// the burger.js 'model' uses orm functions that will interact with the
// burger_db database.

var burger = {
  all(cb) {
    orm.all("burgers", (res) => {
      cb(res);
    });
  },
  // variables cols and vals are arrays.
  create(cols, vals, cb) {
    orm.create("burgers", cols, vals, (res) => {
      cb(res);
    });
  },
  update(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, (res) => {
      cb(res);
    });
  },
  delete(condition, cb) {
    orm.delete("burgers", condition, (res) => {
      cb(res);
    });
  },
  confirm(condition, cb) {
    orm.confirm("burgers", condition, (res) => {
      cb(res);
    });
  }
};

module.exports = burger;