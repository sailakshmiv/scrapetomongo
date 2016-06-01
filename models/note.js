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
var NoteSchema = new Schema({
    comment: {type: String, required: true},
    date: {type: String, default: Date.now, required: true},
    show_id: {type: String, required: true}
});

//=============================================================
var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;