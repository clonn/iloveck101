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


  request url, (err, res, body) ->
    $ = cheerio.load(body)
    title = $('title').html()
    nodeImgs = $('#postlist .plhin:nth-of-type(2) .t_fsz img')
    fullPath = path.join(currentPath, "#{targetFolder}/#{title}")

    unless title
      return console.log "Network is not executed"
      
    mkdirp fullPath, (err) ->
      if err
        return console.error(err)
      else
        console.log(fullPath)

    for node in nodeImgs
      fileUrl = node.attribs.file
      fileName = fileUrl.split("/")
      fileName = fileName[fileName.length - 1]
      currentFullPath = path.join(fullPath, fileName)
      console.log currentFullPath
      saveFile(fileUrl, currentFullPath)

# saveFile("http://s2.imgs.cc/img/r4LdVuSt.jpg", currentFullPath)