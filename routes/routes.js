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

// define the show comment route based on showId
router.get('/notes/:showId', function (req, res) {

    var showId = req.params.showId;

    console.log(showId);
    Notes.find({show_id: showId}, function (err, doc) {

        if (err) {
            console.error(err);
        }

        else {
            res.render('notes', {doc});
            // res.json(doc);
            console.log(doc);
        }

    });

});
// define the show comment route based on showId
router.get('/delete/:noteId', function (req, res) {

    var noteId = req.params.noteId;
    console.log('delete note: '+ noteId);

    Notes.remove({_id:noteId}, function (err, notes) {

        if (err) {
            console.error(err);
        }

        else {
            res.render('notes', {notes});
            // res.json(notes);
            console.log(notes);
        }

    });

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
    var showIndex = req.body.indexNum;

    console.log(showIndex);
    console.log('The showId has been passed to the URL successfully:  ' + showId);
    // var showNote = $(this);
    var newNote = new Notes({show_id: showId, author: author, comment: comment});

    newNote.save(function (err, doc) {
        if (err) {
            console.log('----------------------');
            console.log('Write to mongo failed');
            console.log(err);
        } else {
            console.log('----------------------');
            console.log('New note saved to mongo');
            console.log(doc);
        }
        res.redirect('/');
    });
});

module.exports = router;

