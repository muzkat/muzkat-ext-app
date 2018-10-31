const express = require('express'),
    port = 3333;

let app = express();
app.use(express.static('public'));

app.listen(port, function () {
    console.log('Muzkat Frame listening on port ' + port + '!');
});