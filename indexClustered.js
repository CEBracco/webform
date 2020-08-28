require('module-alias/register');

function connectToDB() {
    global.db = require('@appSrc/db/config/db');
    global.configurationCache = require('@localModules/config/initializers/configurationCache');
}

function loadControllers() {
    require('@appSrc/controllers/productController');
    require('@appSrc/controllers/typographyController');
    require('@appSrc/controllers/backgroundController');
    require('@appSrc/controllers/customerInfoController');
    require('@appSrc/controllers/orderController');
    require('@appSrc/controllers/photoUploadController');
    require('@appSrc/controllers/detailController');
    require('@appSrc/controllers/completedOrderController');
    require('@appSrc/controllers/checkoutController');
    require('@appSrc/controllers/imageController');
    require('@appSrc/controllers/ordersListController');
    require('@appSrc/controllers/mercadoPagoController');
    require('@appSrc/controllers/adminProductsController');
    require('@appSrc/controllers/configurationController');
}

function loadNotificationBroker() {
    global.notificationBroker = require('@appSrc/notification/notificationBroker');
}

function loadUtils() {
    require('@appSrc/utils/dateUtils');
}

var cluster = require('cluster');
var cCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    // Create a worker for each CPU
    for (var i = 0; i < cCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online.');
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died.');
    });
}
else {
    global.server = require('@appSrc/server/server');
    connectToDB();
    loadUtils()
    loadControllers();
    loadNotificationBroker();
    global.server.start();
}
