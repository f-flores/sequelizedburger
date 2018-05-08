// ================================================================================
//
// File name: connection.js
// Description: Performs connection to mysql database.
//
// ================================================================================

var mysql = require("mysql");
var connection;

require("dotenv").config();

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
  // database host and port number
  "port": 3306,
  "host": "localhost",

  // database username and password
  "user": "dbuser",
  "password": "",

  // database name
  "database": "burgers_db"

  });
}

// make connection
connection.connect(function(err) {
  if (err) {
    console.log("Database connection error: " + err.stack);
    throw err;
  }

  console.log("connected as id " + connection.threadId);
});

// export database connection for ORM module to use
module.exports = connection;