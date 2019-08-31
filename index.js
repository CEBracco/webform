require('module-alias/register');
global.server = require('@appSrc/server/server');

function connectToDB() {
    global.db = require('@appSrc/db/config/db');
}

function loadControllers() {
    require('@appSrc/controllers/productController');
    require('@appSrc/controllers/typographyController');
    require('@appSrc/controllers/backgroundController');
    require('@appSrc/controllers/customerInfoController');
    require('@appSrc/controllers/orderController');
    require('@appSrc/controllers/photoUploadController');
    require('@appSrc/controllers/detailController');
}

connectToDB();
loadControllers();
global.server.start();