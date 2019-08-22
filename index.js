require('module-alias/register');
global.server = require('@appSrc/server/server.js');

function connectToDB() {
    global.dbConnection = require('@localModules/dbConnection/dbConnection');
}

function loadModels() {
    require('@appSrc/models/product');
}

function loadControllers() {
    require('@appSrc/controllers/productController.js');
    require('@appSrc/controllers/typographyController.js');
    require('@appSrc/controllers/backgroundController.js');
    require('@appSrc/controllers/customerInfoController.js');
}

connectToDB();
loadControllers();
global.server.start();