const express = require('express');
const app = express();
const fs = require('fs');
// const converter = require('xml-js');
const converter = require('xml2js');
const parseString = converter.parseString;
const xml = require('xml');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');

app.get('/collection', (req, res, next) => {
  res.header('Content-type', 'text/xml');
  res.send(xmlFile);
});

app.use(express.json());

app.post('/addcamera', (req, res, next) => {
  console.log('posting');
  // convert xmlFile to JSON
  parseString(xmlFile, (err, res) => {
    if (err) console.log(err);

    const json = res;
    // edit JSON
    console.log(req.body);

    const camera = { ...req.body };
    json.my_collection.cameras[0].camera.push(camera);

    console.log(camera);

    // convert JSON to xml
    const builder = new converter.Builder();
    const xml = builder.buildObject(json);

    // write/save XML file
    fs.writeFile('newxml.xml', xml, (err, data) => {
      if (err) console.log(err);
      console.log('success writing data');
    });
  });
});
