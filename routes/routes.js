/**
 * Created by Walter on 6/1/2016.
 */
const express = require("express");
var router = express.Router();
//var app = express();

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
router.get('/submit/:showId', function (req, res) {
    // find the article that matches the id from the req.param
    Deadshows.findOne({'_id': req.params.id})
        .populate('comment')
        // execute the command and send success message if it works
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.json(doc);
            }
            var NotesSchema = new Schema({
                author: req.body.author,
                comment: req.body.comment,
                show_id: req.params.id
            });

            Notes.save(function (err) {
                if (err) return handleError(err);
                // thats it!
            });
        });

});


router.post('/submit/:showId', function (req, res) {
    console.log('POST was called');
    var showId = req.params.showId;
    console.log('showId has been passed to URL successfully:' + showId);
    // var showNote = $(this);
    var newNote = new Notes({show_id: showId, comment: req.body.comment});
    newNote.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
});

module.exports = router;

