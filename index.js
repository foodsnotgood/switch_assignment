const express = require('express');
const app = express();
const fs = require('fs');
const converter = require('xml2js');
const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');
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

  return newObj['aperature']
    ? json.my_collection.lenses[0].lens.push(newObj)
    : json.my_collection.cameras[0].camera.push(newObj);

  // if(newObj['aperature']){
  //   json.my_collection.lenses[0].lens.push(newObj);
  //   return json;
  // }
  // json.my_collection.cameras[0].camera.push(newObj);
  // return json;
};

const json2xml = json => {
  const builder = new converter.Builder();
  const xml = builder.buildObject(json);
  return xml;
};

app.post('/addcamera', (request, response, next) => {
  converter.parseString(xmlFile, (err, jsonData) => {
    if (err) response.json({ msg: err });
    const json = addRequestBodyToJSON(jsonData, request);
    const xml = json2xml(json);
    try {
      fs.writeFileSync('newxml.xml', xml);
      response.json({ msg: 'success' });
    } catch (err) {
      response.json({ msg: err });
    }
  });
});

app.post('addlens', (request, response, next) => {
  converter.parseString(xmlFile, (err, jsonData) => {
    if (err) response.json({ msg: err });
    const json = addRequestBodyToJSON(jsonData, request);
    const xml = json2xml(json);
    try {
      fs.writeFileSync('newxml.xml', xml);
      response.json({ msg: 'success' });
    } catch (err) {
      response.json({ msg: err });
    }
  });
});

app.get('/collection', (req, res, next) => {
  res.header('Content-type', 'text/xml');
  res.send(xmlFile);
});

app.get('/', (req, res) => res.send('Working!!!'));
