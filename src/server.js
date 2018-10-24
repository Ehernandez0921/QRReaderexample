var express = require('express');
var app = express();
var fetch=require('node-fetch');
// app.use(express.static(__dirname + '/publicServer'));

app.get('/searchCode/:codeId', async function (req, res) {
  try {
    const response = await fetch(`https://api.upcdatabase.org/product/${req.params.codeId}/70F7A52D147BABF68FA32CD9D6B01A0A`);
    const data=await response.json();
    res.json(data)
  } catch (err) {
    res.json(err);
  }
})

app.listen(process.env.PORT || 8080, () => { console.log('heere') });
console.log('Server running on port 3000');