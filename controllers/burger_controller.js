// ================================================================================
//
// File name: burger_controller.js
// Description: burger app controller module. Defines route handlers. Imports
//  burger_db database functions.
//
// ================================================================================

var express = require("express");

// var router = express.Router();
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// import burgerOptions for hamburger list
const burgerOptions = require("../models/burger_options.js");

// burger route handlers
// get all burgers
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      "burgers": data,
      burgerOptions
    };

    console.log(hbsObject);
    res.render("index", hbsObject);
 });
});

// post or insert
router.post("/api/burgers", function(req, res) {
  var condition = "burger_name = '" + req.body.burger_name + "'";

  burger.confirm(condition, function(data) {
    console.log("burger.confirm duplicate data if length >= 1: " + data.length);
    if (data.length >= 1) {
      // on duplicate entry, simply exit with successful status code
      res.status(200).end();
    } else {
    // otherwise burger is added to burger_db
      burger.create(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured], function(result) {
        // Send back the ID of the new burger
        res.json({"id": result.insertId});
      }
      );
    }

    return true;
  });

});

// update
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({"devoured": req.body.devoured}, condition, function(result) {
    if (result.changedRows === 0) {
      // If no rows were changed, ID must not exist, return 404
      return res.status(404).end();
    }
    res.status(200).end();

    return true;
  });
});

// delete
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

    return true;
  });
});

router.get("/api/burgers", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {"burgers": data};

    res.json(hbsObject);
 });
});

// Export routes for server.js to use.
module.exports = router;