// server.js

var express = require('express');

var {faker} = require('@faker-js/faker');

const cors = require('cors');

var app = express();

app.use(cors({
  origin: '*'
}));

var PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

async function random_data() {
  const lines = await new Array(1000).fill().map((value, index) => (({
    id: index,
    title: faker.lorem.words(5),
    body: faker.lorem.sentences(8)
  })))
  return lines;
}
app.get('/conversation/lines', async function(req, res) {
  const lines = await random_data();

  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const limit = parseInt(req.query.limit) || 12;
  const result = {};
  let startIndex = pageNumber * limit;
  const endIndex = (pageNumber + 1) * limit;
  result.totalLines = lines.length;

  if (startIndex > 0) {
    result.previous = {
      pageNumber: pageNumber - 1,
      limit: limit,
    };
  }
  if (endIndex < lines.length) {
    result.next = {
      pageNumber: pageNumber + 1,
      limit: limit,
    };
  }
  result.data = lines.slice(startIndex, endIndex);
  result.rowsPerPage = limit;
  res.json(result);
  
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});
