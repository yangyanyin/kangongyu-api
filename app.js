var createError = require('http-errors')
var express = require('express')
var bodyParser = require('body-parser')
var cmsRoute = require('./routes/cmsRoute')
var webRoute = require('./routes/webRoute')
var app = express();
const path = require('path')
const fs = require('fs')
process.env.TZ = 'UTC'

app.get('/sitemap.xml', function (req, res, next) {
  var stream=fs.createReadStream('./public/test/test.xml',{flags:'r'});
    stream.pipe(res);
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('./public'))
app.use(cmsRoute)
app.use(webRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(4000, '0.0.0.0', err => {
  if (err) {
    console.error('服务启动失败，重新启动。')
  } else {
    console.info(`服务启动成功:${getIPAdress()}:4000`)
    console.info(`服务启动成功:http://localhost:4000`)
  }
})


// new 
function getIPAdress() {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}