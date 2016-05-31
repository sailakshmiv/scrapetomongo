/**
 * Created by Walter on 5/31/2016.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
mongoose.connect('mongodb://testuser:secret@ds019893.mlab.com:19893/sandbox');


// Creates a User Schema. This will be the basis of how user data is stored in the db
var DeadSchema = new Schema({
    venue: {type: String, required: true},
    date: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});




  deadshow  = mongoose.model('deadshow', DeadSchema);
  module.exports= deadshow;