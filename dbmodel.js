/**
 * Created by Walter on 5/31/2016.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var DeadSchema = new Schema({
    venue: {type: String, required: true},
    date: {type: Date, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

mongoose.connect('mongodb://testuser:secret@ds019893.mlab.com:19893/sandbox');

module.exports= mongoose.model('deadshows', deadSchema);