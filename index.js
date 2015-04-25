var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var oneDay = 86400000;

app.use(express.static(__dirname + '/', { maxAge: oneDay }));

var jumping = {};

app.use(bodyParser.urlencoded()); 
app.post('/update-status', function(req, res, next) {
  var msg = (req.body.Text || '').split(' ');
  console.log(msg)
  jumping.status = msg[0];
  if (msg.length > 1) {
    jumping.message = msg.slice(1).join(' ');
  } else {
    jumping.message = '';
  }
  res.send('BOOM');
});

app.get('/update-status', function(req, res, next) {
  res.send(jumping);
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Serving on ' + (process.env.PORT || 3000));
});
