// ================================================================================
//
// File name: orm.js
// Description: ORM is an object relational mapping.
//  Code largely based on template given out in Rutgers Coding Bootcamp
//  https://github.com/RutgersCodingBootcamp/RUTSOM201801FSF4-Class-Repository-FSF/blob/master/14-handlebars/1-Class-Content/14.3/Activities/18-CatsApp/Solved/config/orm.js
//
// ================================================================================

// mysql connection
var connection = require("../config/connection.js");

var orm = {};

// --------------------------------------------------------------------------------
// ORM helper functions
//

// ---------------------------------------------------------------------------------
// printQuestionMarks() below loops through and creates an array of question marks - ["?", "?", "?"]
// - and turns it into a string. Example: ["?", "?", "?"].toString() => "?,?,?";
//
function printQuestionMarks(num) {
  var arr = [],
      ind;

  for (ind = 0; ind < num; ind++) {
    arr.push("?");
  }

  return arr.toString();
}

// ---------------------------------------------------------------------------------
// objToSql() loops through the keys and push the key/value as a string int arr
//
function objToSql(ob) {
  var arr = [],
    key, value;

  for (key in ob) {
    value = ob[key];

    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

orm = {
  // all template
  all(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // insert template
  create(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete(table, condition, cb) {
    var queryString = "DELETE FROM " + table;

    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  confirm(table, condition, cb) {
    var queryString = "SELECT * FROM " + table;

    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }

};

// export orm object for the burger model
module.exports = orm;