var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var catchMods = require('./routes/catchMods');

app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5000);

app.use('/catchMods', catchMods);

app.get('/*', function(req, res) {
    console.log("params: " , req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});


app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});
