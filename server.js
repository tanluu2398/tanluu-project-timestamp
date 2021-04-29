// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (req, res) {
  res.json({unix: Date.now(), utc: Date().toUTCString()})
});

// your first API endpoint... 
app.get("/api/:slug", function (req, res) {
  let date = req.params.slug;
  if (/\d{5,}/.test(date)) date = parseInt(date);
  date = new Date(date);
  if (date.toString()==='Invalid Date') return   res.json({error: date.toString()});
    
  res.json({unix: new Date(date).valueOf(), utc: new Date(date).toUTCString()}) 
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
