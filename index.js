require('module-alias/register');
global.server = require('@appSrc/server/server');

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
    require('@appSrc/controllers/labController');
}

function loadNotificationBroker() {
    global.notificationBroker = require('@appSrc/notification/notificationBroker');
}

function loadUtils() {
    require('@appSrc/utils/dateUtils');
}

connectToDB();
loadUtils()
loadControllers();
loadNotificationBroker();
global.server.start();