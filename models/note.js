/**
 * Created by walter on 5/31/2016.
 */
/**
 * Created by Walter on 5/31/2016.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//================================================================================================
// Creates a Notes Schema. This will be the basis of how dates and venues are stored in the db
var NotesSchema = new Schema({
    author: {type: String, required: true},
    comment: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    show_id: {type: String, required: true}
});

//=============================================================
var Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;