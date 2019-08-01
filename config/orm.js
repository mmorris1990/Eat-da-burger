// ----- DECLARES METHODS FOR EXECUTING MYSQL COMMANDS FOR CRUD ROUTES -----

// Dependencies
var connection = require("./connection.js");

// Helper function for SQL syntax. Loops through and creates an array of question marks and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

var orm = {
    // Method to select all burger data 
    selectAll: function (tableInput, cb) {
        // Construct the query string that returns all rows from the target table
        var queryString = "SELECT * FROM " + tableInput + ";";

        // Perform the database query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    },

    // Method to add a burger
    insertOne: function (table, cols, vals, cb) {
        // Construct the query string that inserts a single row into the target table
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + printQuestionMarks(vals.length) + ") ";

        console.log(queryString);

        // Perform the database query
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    },

    // Method to change burger from left to right
    updateOne: function (table, objColVals, condition, cb) {
        // Construct the query string that updates a single entry in the target table
        var queryString = "UPDATE " + table + " SET" + objToSql(objColVals) + " WHERE " + condition;

        console.log(queryString);

        // Perform the database query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    }
};

// Export the orm object for model use
module.exports = orm;
