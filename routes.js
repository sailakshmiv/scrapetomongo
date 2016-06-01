/**
 * Created by Walter on 6/1/2016.
 */
const express = require("express");
var router = express.Router();
var app = express();

var Deadshow = require("./models/dbmodel.js");

app.get("/:year", function (req, res) {
    console.log('GET WAS CALLED');
    var year = req.params.year;


    if (year < 1965 || year > 1995) {
        res.render('home', "Sorry, no shows found for this year");
    }

    else {

        Deadshow.find({date: new RegExp(year)}, function (err, doc) {

            if (err) {
                console.error(err);
            }

            else {
                //  res.render('home', {doc});
                res.json(doc);
                console.log(doc);
            }

        });

    }


});


module.exports = router;

