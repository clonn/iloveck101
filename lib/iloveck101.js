var cheerio, fs, mkdirp, path, request, saveFile, targetFolder;

fs = require("fs");

request = require('request');

cheerio = require('cheerio');

mkdirp = require('mkdirp');

path = require('path');

targetFolder = "iloveck101";

saveFile = function(fileUrl, currentFullPath) {
  var ws;
  ws = fs.createWriteStream(currentFullPath);
  ws.on('error', function(err) {
    return console.log(err);
  });
  return request(fileUrl).pipe(ws);
};

module.exports.set = function(url, currentPath) {
  return request(url, function(err, res, body) {
    var $, currentFullPath, fileName, fileUrl, fullPath, node, nodeImgs, title, _i, _len, _results;
    $ = cheerio.load(body);
    title = $('title').html();
    nodeImgs = $('#postlist .plhin:nth-of-type(2) .t_fsz img');
    fullPath = path.join(currentPath, "" + targetFolder + "/" + title);
    if (!title) {
      return console.log("Network is not executed");
    }
    mkdirp(fullPath, function(err) {
      if (err) {
        return console.error(err);
      } else {
        return console.log(fullPath);
      }
    });
    _results = [];
    for (_i = 0, _len = nodeImgs.length; _i < _len; _i++) {
      node = nodeImgs[_i];
      fileUrl = node.attribs.file;
      fileName = fileUrl.split("/");
      fileName = fileName[fileName.length - 1];
      currentFullPath = path.join(fullPath, fileName);
      console.log(currentFullPath);
      _results.push(saveFile(fileUrl, currentFullPath));
    }
    return _results;
  });
};
