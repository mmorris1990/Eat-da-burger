// ----- BURGER OBJECT THAT CALLS THE ORM METHODS USING APP SPECIFIC INPUT -----

// Dependencies
var orm = require("../config/orm.js");

// Create the burger object
var burger = {
    // Select all burger table entries
    selectAll: function (cb) {
        orm.selectAll('burgers', function (res) {
            cb(res);
        });
    },

    // Insert a new burger into the table
    // The variables cols and vals are arrays
    insertOne: function (cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function (res) {
            cb(res);
        });
    },

    // Update an existing burger (from not devoured to devoured)
    // The objColVals is an object specifying columns as object keys with associated values
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function (res) {
            cb(res);
        });
    }
};

// Exports the burger object for controller use
module.exports = burger;
