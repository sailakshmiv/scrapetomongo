var morgan = require('morgan');
//============================
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var favicon = require('serve-favicon');

var Deadshows = require('./models/dbmodel.js');

var router = require('./routes/routes.js');

var exphbs = require('express-handlebars');
//favicon 
app.use(favicon(__dirname + '/public/favicon.ico'));
// use method overide
app.use(methodOverride('X-HTTP-Method-Override'));

// set up body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));


//logger in dev mode
app.use(logger('dev'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static(__dirname + '/public'));

app.use('/', router);
app.use('/:year', router);
app.use('/submit/:showId', router);

//Database configuration
//toggle between cloud based and local based on db instance below
//by uncommenting one and commenting the other
//================================

// =============CLOUD===========//
//mongoose.connect('mongodb://testuser:secret@ds019893.mlab.com:19893/deadshows');


//==============LOCAL===========//
mongoose.connect('mongodb://localhost/deadshows');


//==============================
// Connection
//============================
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
//capture show date and venue then split into showDate and showVenue
//============================
function scrape(gratefulUrl, showYear) {

    request(gratefulUrl + showYear, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('span.field-content').each(function (i, element) {
                var a = $(this).text().toString();
                var showData = a.split("-");
                showDate = showData[1];
                showVenue = showData[0];
                console.log(showDate + ' ' + showVenue);
                var deadshow1 = new Deadshows({venue: showVenue, date: showDate});
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

//======================================
// uncomment scraper to repopulate database
// loop through years '65 to '95
//===SCRAPER======START==============

// for (showYear = 1965; showYear < 1996; showYear++) {
//     scrape(gratefulUrl, showYear);
// }

//=======================================
// =====SCRAPER====END======
//=======================================
var PORT = process.env.PORT || 8080;

//Listener 
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
