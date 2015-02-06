var express = require('express');
var app = express();

var oneDay = 86400000;

app.use(express.static(__dirname + '/', { maxAge: oneDay }));

app.listen(process.env.PORT || 3000, function() {
  console.log('Serving on ' + (process.env.PORT || 3000));
});