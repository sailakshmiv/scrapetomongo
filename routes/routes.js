/**
 * Created by Walter on 6/1/2016.
 */
const express = require("express");
var router = express.Router();


var Deadshow = require("./../models/dbmodel.js");
var Notes = require('./../models/note.js');

// define the home page route
router.get('/', function (req, res) {
    res.render('home');
});


router.get("/:year", function (req, res, next) {
    //  console.log('GET WAS CALLED');
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
                res.render('home', {doc});
                // res.json(doc);
                // console.log(doc);
            }

        });

    }


});



router.post('/submit/:showId', function (req, res) {
    console.log('-POST- was called');
    var showId = req.params.showId;
    var author =  req.body.noteAuthor;
    var comment = req.body.showNote;
    console.log('showId has been passed to URL successfully:' + showId);
    // var showNote = $(this);
    var newNote = new Notes({show_id: showId, author: author, comment: comment});
    newNote.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
        res.redirect('/');
    });
});

module.exports = router;

