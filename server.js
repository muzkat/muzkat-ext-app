var express = require('express');

var port = 3333;
// create express app and start serving files from public folder
var app = express();
app.use(express.static('demo'));

app.listen(port, function () {
    console.log('Muzkat Frame listening on port ' + port + '!');
});