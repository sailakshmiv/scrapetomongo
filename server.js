
var morgan = require('morgan');
//============================
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');


var express = require('express');
var app = express();

var Deadshow = require('./models/dbmodel.js');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

//Database configuration
//mongoose.connect('mongodb://testuser:secret@ds019893.mlab.com:19893/deadshows');
mongoose.connect('mongodb://localhost/deadshows');

var db = mongoose.connection;


db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});
db.once('open', function () {
    console.log('Mongoose connection successful.');
});

//============================


//app.use(morgan('combined'));
//============================

var showDate = '';
var showVenue = '';
//============================
//var deadshow1 = new deadshow({venue: 'Springfield Civic Center Arena', date: 'March 25, 1985'});
//============================
var showYear = 1965;

var gratefulUrl = 'http://www.dead.net/shows-by-year/';

//============================
function scrape(gratefulUrl, showYear) {

    request(gratefulUrl + showYear, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('span.field-content').each(function (i, element) {
                var a = $(this).text().toString();
                var showData = a.split("-");
                showDate = showData[0];
                showVenue = showData[1];
                console.log(showDate + ' ' + showVenue);
                var deadshow1 = new Deadshow({venue: showVenue, date: showDate});
                deadshow1.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                });
            });
        }
    });
}


for (showYear = 1965; showYear < 1996; showYear++) {
    scrape(gratefulUrl, showYear);
}


app.listen(5005);