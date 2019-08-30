const path = require('path');
var config = require('@localModules/config/Config.js');
const Logger = require('@localModules/logger/Logger.js');
const express = require('express');
const fileUpload = require('express-fileupload');
const secure = require('express-force-https');

var logger = new Logger();
var port = config.get('PORT');
var app = express();
var appPath = path.dirname(require.main.filename);

app.use(secure);
app.use(express.json());
app.use(fileUpload());
app.use('/', express.static(appPath + '/app/web/static'));
app.set('views', appPath + '/app/web/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

function start() {
  port = port ? port : 3000;
  app.listen(port, function () {
    logger.getLogger().debug("Static file server running at port => " + port);
  });
}

module.exports = {
  start: start,
  app: app
}
