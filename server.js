/* ************************************************************************************************
 *
 * File Name: server.js
 * Description: server using express and express-handlebars for burger app.
 * Author: Fabian Flores
 * Date: May, 2018
 *
 * *************************************************************************************************/

var express = require("express");
var expresshbs = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();
var routes;

// serve static content from the public directory (e.g. burger_style.css)
app.use(express.static("public"));

// parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

// set Handlebars as the default templating engine.
app.engine("handlebars", expresshbs({
  "defaultLayout": "main",
  "helpers": {
    "addOne": (value) => parseInt(value, 10) + 1
    // function addOne is not used
  }
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
routes = require("./controllers/burger_controller.js");

app.use(routes);

// launch server listener for client requests
app.listen(PORT, () => {
  // server-side log when server has started
  console.log("Server listening on: http://localhost:" + PORT);
});