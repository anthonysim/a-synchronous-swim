const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const url = require('url')
const kepress = require('./keypressHandler.js')
// const SwimTeam = require("client/js/swimTeam.js")

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;

module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => { }) => {
  //  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
    } else if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end()
        next()
      })
    }
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var fileData = Buffer.alloc(0);

    req.on('data', chunk => {
      fileData = Buffer.concat([fileData, chunk])
    })

    req.on('end', () => {
      var file = multipart.getFile(fileData);
      fs.writeFile(module.exports.backgroundImageFile, fileData, (err) => {
        res.writeHead(err ? 400 : 201, headers)
        res.end()
        next()
      })
    })
  }
};

