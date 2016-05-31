var mongoose =  require('mongoose');
mongoose.connect('mongodb://testuser:secret@ds019893.mlab.com:19893/deadshows');

var DeadSchema = new mongoose.Schema({
    venue: {type: String, required: true},
    date: {type: Date, required: true}
});

var DeadShow = mongoose.model("DeadShows", DeadSchema);

var deadshow1 = new DeadShow({venue:'Springfield Civic Center Arena', date:'March 24, 1985'});
