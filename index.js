const express = require('express');
const app = express();
const fs = require('fs');
const converter = require('xml2js');
const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');

// allow cross origin access
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
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());

app.listen(3000, () => {
  console.log('listening on port 3000');
});

const addRequestBodyToJSON = (data, request) => {
  const json = data;
  const camera = { ...request.body };
  json.my_collection.cameras[0].camera.push(camera);
  return json;
};

const json2xml = json => {
  const builder = new converter.Builder();
  const xml = builder.buildObject(json);
  return xml;
};

app.post('/addcamera', (request, response, next) => {
  converter.parseString(xmlFile, (err, jsonData) => {
    if (err) response.send(err);
    const json = addRequestBodyToJSON(jsonData, request);
    const xml = json2xml(json);
    try {
      fs.writeFileSync('newxml.xml', xml);
      response.send('Success');
    } catch (err) {
      response.send(err);
    }
  });
});

app.get('/collection', (req, res, next) => {
  res.header('Content-type', 'text/xml');
  res.send(xmlFile);
});
