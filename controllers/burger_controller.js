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
// var burger = require("../models/burger.js");

// Requiring our Todo model
var db = require("../models");

// import burgerOptions for hamburger list
const burgerOptions = require("../appdata/burger_options.js");

// burger route handlers
// get all burgers
router.get("/", function(req, res) {
  db.Burger.findAll({}).
  then(function(burgerData) {
    var hbsObject = {
      "burgers": burgerData,
      burgerOptions
    };

    console.log("hbs burgers: " + JSON.stringify(hbsObject.burgers));

    res.render("index", hbsObject);
  });
});

// api get
router.get("/api/burgers", function(req, res) {
  db.Burger.findAll({}).
  then(function(burgerData) {
    res.json(burgerData);
  });
});

// post or insert
router.post("/api/burgers", function(req, res) {
  // var condition = "burger_name = '" + req.body.burger_name + "'";

  db.Burger.findAll({"where": {"burger_name": req.body.burger_name}}).
  then(function(data) {
    console.log(data);
    if (data.length >= 1) {
      // duplicate, return status 200 without adding burger name to db
      res.status(200).end();
    } else {
      db.Burger.create(req.body).then(function(burgerData) {
        res.json(burgerData);
      });
    }
  });

});

// update
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("in put update, condition", condition);

  db.Burger.update(
    req.body,
    {"where": {"id": req.params.id}}
    ).
    then(function(dbBurger) {
      console.log("in update dbburger: " + JSON.stringify(dbBurger));
      if (dbBurger.length === 0) {
        // return 404 if no rows were changed, this means id does not exist
        return res.status(404).end();
      }
    // res.json(dbBurger);
    res.status(200).end();

    return true;
  });
});

// delete
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  db.Burger.destroy({"where": {"id": req.params.id}}).
  then(function(dbBurger) {
    if (dbBurger.affectedRows === 0) {
      // return 404 if no rows were changed, this means id does not exist
      return res.status(404).end();
    }
    // res.json(dbPost);
    res.status(200).end();

    return true;
  });

});


// Export routes for server.js to use.
module.exports = router;