fs = require("fs")
request = require('request')
cheerio = require('cheerio')
mkdirp = require('mkdirp')
path = require('path')
targetFolder = "iloveck101"

# currentFullPath = path.join(fullPath, "0.jpg")

saveFile = (fileUrl, currentFullPath) ->
  ws = fs.createWriteStream(currentFullPath)
  ws.on('error', (err) -> console.log err )
  request(fileUrl).pipe(ws)

module.exports.set = (url, currentPath) ->
  folderName = url.match(/thread-\d+-\d/)[0]

  unless folderName
    return console.log "Network is not executed"

  fullPath = path.join(currentPath, targetFolder, folderName)

  mkdirp fullPath, (err) ->
    if err
      return console.error(err)
    else
      console.log(fullPath)

  request url, (err, res, body) ->
    $ = cheerio.load(body)
    nodeImgs = $('img.zoom')
    
    for node in nodeImgs
      fileUrl = node.attribs.file
      fileName = fileUrl.split("/")
      fileName = fileName[fileName.length - 1]
      currentFullPath = path.join(fullPath, fileName)
      console.log currentFullPath
      saveFile(fileUrl, currentFullPath)

# saveFile("http://s2.imgs.cc/img/r4LdVuSt.jpg", currentFullPath)
