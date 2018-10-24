var express = require('express');
var app = express();
var fetch=require('node-fetch');
// app.use(express.static(__dirname + '/publicServer'));

app.get('/searchCode/:codeId', async function (req, res) {
  try {
    const response = await fetch(`http://api.walmartlabs.com/v1/items?apiKey=md6cpy6t4jk2y43rwp3epp8a&upc=${req.params.codeId}`);
    const data=await response.json();
    res.json(data)
  } catch (err) {
    res.json(err);
  }
})

app.listen(process.env.PORT || 8080, () => { console.log('heere') });
console.log('Server running on port 3000');