const express = require('express');
const app = express();
const fs = require('fs');
// const converter = require('xml-js');
const converter = require('xml2js');
const parseString = converter.parseString;
const xml = require('xml');

app.listen(3000, () => {
  console.log('listening on port 3000');
});

const xmlFile = fs.readFileSync('cameras.xml', 'utf-8');

app.get('/collection', (req, res, next) => {
  res.header('Content-type', 'text/xml');
  res.send(xmlFile);
});

const newCamera = { brand: 'Ricoh', name: 'GR3', mp: '16' };
// testing write xml
// parseString(xmlFile, (err, res) => {
//   if (err) console.log(err);

//   const json = res;

//   json.my_collection.cameras[0].camera.push(newCamera);
//   json.my_collection.cameras[0].camera[0].name = 'bla';
//   const cameras = json.my_collection.cameras[0].camera;
//   console.log(cameras);

//   fs.writeFile('newxml.xml', xml, (err, data) => {
//     if (err) console.log(err);
//     console.log('success writing data');
//   });
// });

app.post('/addcamera', (req, res, next) => {
  // convert xmlFile to JSON
  parseString(xmlFile, (err, res) => {
    if (err) console.log(err);

    const json = res;
    // edit JSON
    json.my_collection.cameras[0].camera.push(req.body);

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
