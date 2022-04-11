# switch_assignment
Simple api to read/write xml

In order to start my new career at Brightest as QA engineer I was asked to build a simple website that could read an XML file with an optional (not mandatory) ability to write to said file.

I decided to tackle it the following way:

1. write an XML: Since it should be about something that interests me, and I am fascinated by photography, I thought I'd write a simple XML containing the different camera's and lenses I possess. (Not that many actually, since it's an expensive hobby, but still)
2. The objective was to use HTML, CSS, and Javascript. And since I had never worked with Node.js I thought it a great challenge to build a small API in Node.js  that could not only read that XML file but also add new info to it.
3. Building an API allows me to completely decouple the front end. That way I could build a small interface and to use on my personal website www.johannesroeder.be and host the API on Heroku (free version).

The challenges I experienced so far:
Since I am used to Java Spring it was interesting to learn how to determin routes in Node (which was much simpler then I expected). The greatest challenge to has been to work with the XML instead of JSON. Since it's really ease to use and manipulate JSON in Javascript I used an external package 'xml2json' to transform the data back and forth.
