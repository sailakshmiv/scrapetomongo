/**
 * Created by Walter on 5/31/2016.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//================================================================================================
// Creates a DeadShow Schema. This will be the basis of how dates and venues are stored in the db
var DeadSchema = new Schema({
    venue: {type: String, required: true},
    date: {type: String, required: true}
    //   created_at: {type: Date, default: Date.now},
    //    updated_at: {type: Date, default: Date.now}
});

//=============================================================
var Deadshow = mongoose.model('Deadshow', DeadSchema);
module.exports = Deadshow;
