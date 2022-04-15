const express = require('express');
const app = express();
const fs = require('fs');
const converter = require('xml2js');
const cors = require('cors');

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options('*', cors());

// // allow cross origin access
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000 locally');
});

const addRequestBodyToJSON = (data, request) => {
  const json = data;
  const newObj = { ...request.body };

  if (newObj['aperature']) {
    json.my_collection.lenses[0].lens.push(newObj);
    return json;
  }
  json.my_collection.cameras[0].camera.push(newObj);
  return json;
};

const json2xml = json => {
  const builder = new converter.Builder();
  const xml = builder.buildObject(json);
  return xml;
};

app.post('/addcamera', (request, response, next) => {
  const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');
  converter.parseString(xmlFile, (err, jsonData) => {
    if (err) response.json({ msg: err });
    const json = addRequestBodyToJSON(jsonData, request);
    const xml = json2xml(json);
    try {
      fs.writeFileSync('cameras.xml', xml);
      response.json({ msg: 'Success!!' });
    } catch (err) {
      response.json({ msg: err });
    }
  });
});

app.post('/addlens', (request, response, next) => {
  const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');
  converter.parseString(xmlFile, (err, jsonData) => {
    if (err) response.json({ msg: err });
    const json = addRequestBodyToJSON(jsonData, request);
    const xml = json2xml(json);
    try {
      fs.writeFileSync('cameras.xml', xml);
      response.json({ msg: 'Success!!' });
    } catch (err) {
      response.json({ msg: err });
    }
  });
});

app.get('/collection', (req, res, next) => {
  const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');
  res.header('Content-type', 'text/xml');
  res.send(xmlFile);
});

app.get('/collection/original', (req, res, next) => {
  const xmlFile = fs.readFileSync('cameras_original.xml', 'utf-8');
  res.header('Content-type', 'text/xml');
  res.send(xmlFile);
});

app.get('/', (req, res) => res.send('Working!'));
