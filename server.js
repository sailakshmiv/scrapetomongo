var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('combined'));

var deadshow = require('../models/dbmodel.js');
var notes = require('../models/notes.js');

var deadshow1 = new deadshow({venue:'Springfield Civic Center Arena', date:'March 25, 1985'});

deadshow1.save();
app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(8080);