var express = require('express');
var app = express();

app.use(express.static(__dirname + '/publicServer'));

app.get('/fimlList', function(req, res) {
  console.log('i receive a GET request');

  var tryFetch = {myString: 'I am working fetch'};

  res.json(tryFetch)
})

app.listen(3000);
console.log('Server running on port 3000');