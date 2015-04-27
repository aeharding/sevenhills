var STATUS_TYPES = ['clear', 'open', 'closed', 'standby', 'wind', 'weather', 'future', 'custom'];

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/' + (process.env.STATUS_ENDPOINT || 'jumping-status'), function(req, res, next) {

  if (STATUS_TYPES.indexOf(req.body.Text.split(' ')[0]) !== -1) {

    redis.set('jumping status', req.body.Text || '', function (err, reply) {
      console.log(reply);
    });
    redis.set('posted', (new Date()).toISOString(), function (err, reply) {
      console.log(reply);
    });

    return res.send({success: 'Thanks, bro... now go pay to jump out of a plane.'});

  }
  res.send(400, {error: 'WTF, bro!? That\'s not a valid status!'});
});

app.get('/', function(req, res) {
  redis.get('jumping status', function (err, reply) {
    redis.get('posted', function (err, posted) {
      var msg = (reply || '').split(' ');

      var jumping = {status: null, message: null, posted: posted};
      if (msg[0].toLowerCase() !== 'clear') {
        jumping.status = msg[0];
        if (msg.length > 1) {
          jumping.message = msg.slice(1).join(' ');
        } else {
          jumping.message = null;
        }
      }

      res.render('index', jumping);
    });
  });
});

var oneDay = 86400000;
app.use(express.static(__dirname + '/', { maxAge: oneDay }));

app.listen(process.env.PORT || 3000, function() {
  console.log('Serving on ' + (process.env.PORT || 3000));
});
