// ----- DECLARES CRUD ROUTES FOR EXPRESS TO EXECUTE ORM METHODS -----

// Dependencies
var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

// GET route to Read table data
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };

        console.log(hbsObject);

        // Display table data on index.handlebars
        res.render("index", hbsObject);
    });
});

// POST route to Create new row to table
router.post("/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

// PUT route to Update a row's "devoured" status
router.put("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
