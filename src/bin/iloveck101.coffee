

urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$")

for argv in process.argv
  if urlregex.test(argv)
    url = argv

unless url
  return console.log "Please pass an http url"

console.log "Start download to your #{url}"

fs = require("fs")
request = require('request')
cheerio = require('cheerio')
mkdirp = require('mkdirp')
path = require('path')
fullPath = path.join(__dirname, "iloveck101")

mkdirp fullPath, (err) ->
  if err
    console.error(err)
  else
    console.log(fullPath)


request url, (err, res, body) ->
  $ = cheerio.load(body)
  nodeImgs = $('#postlist .plhin:nth-of-type(2) .t_fsz img')
  for node in nodeImgs
    fileUrl = node.attribs.file
    fileName = fileUrl.split("/")
    fileName = fileName[fileName.length - 1]
    currentFullPath = path.join(fullPath, fileName)
    console.log currentFullPath
    saveFile(fileUrl, currentFullPath)
# currentFullPath = path.join(fullPath, "0.jpg")


saveFile = (fileUrl, currentFullPath) ->
  ws = fs.createWriteStream(currentFullPath)
  ws.on('error', (err) -> console.log err )
  request(fileUrl).pipe(ws)



# saveFile("http://s2.imgs.cc/img/r4LdVuSt.jpg", currentFullPath)