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
  var date = new Date();
  var result = date.toString();
  result = result.slice(0, 3).concat(',').concat(result.slice(3)).slice(0, 29);
  res.json({unix: date.valueOf(), utc: date.toString()})
});

// your first API endpoint... 
app.get("/api/:slug", function (req, res) {
  var date = new Date(req.params.slug.includes('-')?req.params.slug:req.params.slug*1);
  if (date.toString()=='Invalid Date') return   res.json({error: date.toString()});
  else {
    let result = date.toString();
    result = result.slice(0, 3).concat(',').concat(result.slice(3)).slice(0, 29);
    res.json({unix: date.valueOf(), utc: result})
  }  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
