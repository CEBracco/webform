const db = global.db;
var config = require('@localModules/config/Config.js');
var OrderUtils = require('@appSrc/utils/orderUtils');

global.server.app.get(['/:orderId?', '/index.html/:orderId?'], function (req, res) {
    var siteDisabledParams = config.db.getObject('SITE_DISABLED');
    if (!isSiteDisabled(siteDisabledParams)) {
        var orderId = req.params.orderId;
        if (!orderId) {
            orderId = 'default'
        }
        db.Product.findAll({
          where: { enabled: true },
          include: [db.Group],
          order: [[db.Group, "order"], ["price"], ["name"]],
        }).then((products) => {
          db.Order.findOne({ where: { hash: orderId } }).then((order) => {
            res.render("product", {
              products: products,
              order: order,
              priceFunction: OrderUtils.getProductPrice,
            });
            res.end();
          });
        });
    } else {
        disableSite(siteDisabledParams, res);
    }
});

function isSiteDisabled(params) {
    return params ? params.disabled : false;
}

function disableSite(params, res) {
    res.render("disabled", params);
    res.end();
}