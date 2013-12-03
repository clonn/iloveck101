var argv, cheerio, fs, fullPath, mkdirp, path, request, saveFile, url, urlregex, _i, _len, _ref;

urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");

_ref = process.argv;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  argv = _ref[_i];
  if (urlregex.test(argv)) {
    url = argv;
  }
}

if (!url) {
  return console.log("Please pass an http url");
}

console.log("Start download to your " + url);

fs = require("fs");

request = require('request');

cheerio = require('cheerio');

mkdirp = require('mkdirp');

path = require('path');

fullPath = path.join(__dirname, "iloveck101");

mkdirp(fullPath, function(err) {
  if (err) {
    return console.error(err);
  } else {
    return console.log(fullPath);
  }
});

request(url, function(err, res, body) {
  var $, currentFullPath, fileName, fileUrl, node, nodeImgs, _j, _len1, _results;
  $ = cheerio.load(body);
  nodeImgs = $('#postlist .plhin:nth-of-type(2) .t_fsz img');
  _results = [];
  for (_j = 0, _len1 = nodeImgs.length; _j < _len1; _j++) {
    node = nodeImgs[_j];
    fileUrl = node.attribs.file;
    fileName = fileUrl.split("/");
    fileName = fileName[fileName.length - 1];
    currentFullPath = path.join(fullPath, fileName);
    console.log(currentFullPath);
    _results.push(saveFile(fileUrl, currentFullPath));
  }
  return _results;
});

saveFile = function(fileUrl, currentFullPath) {
  var ws;
  ws = fs.createWriteStream(currentFullPath);
  ws.on('error', function(err) {
    return console.log(err);
  });
  return request(fileUrl).pipe(ws);
};
