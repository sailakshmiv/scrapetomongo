/**
 * Created by Walter on 6/5/2016.
 */

// html routes
// require path
var path = require('path');

// export it for the express app
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '../public.index.html'));
    })
};