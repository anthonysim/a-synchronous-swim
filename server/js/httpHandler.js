const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const url = require('url')
// const SwimTeam = require("client/js/swimTeam.js")

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // var q = url.parse(req.url, true);
  // var filename =`../../client${q.pathname}index.html`;
  // console.log(filename);

  fs.readFile('/Users/kenmedbery/Desktop/Part_Time_Immersive/Immersive/sprints/rpt26-a-synchronous-swim/client/index.html', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })



  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    console.log('Serving request type ' + req.method + ' for url ' + req.url);

    res.end();
  }

  // if (req.method === 'GET') {
  //   res.writeHead(200, headers);
  //   console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //   // res.write('left')
  //   let command = ['up', 'down', 'left', 'right'];
  //   let randomIndex = Math.floor(Math.random * 4);
  //   console.log(res.end(command[randomIndex]))
  //   res.write('left')
  //   res.end();
  // }
/* req.body
    res.bnody
    req.header
    res.header
*/

  // res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
