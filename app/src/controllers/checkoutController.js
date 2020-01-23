const db = global.db;
var config = require('@localModules/config/Config.js');
var path = require('path');
var fs = require('fs-extra');
const OrderPhotosUtils = require('@appSrc/utils/orderPhotosUtils');


global.server.app.get(['/checkout/:authToken/:orderId'], function (req, res) {
    var authToken = req.params.authToken;
    var orderId = req.params.orderId;
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        db.Order.findOne({ 
            where: { hash: orderId }, 
            include: [  
                db.Product, 
                { model: db.Text, include: [{ model: db.Variation, as: 'Typography'}]}, 
                { model: db.Variation, as: 'Background'}
            ]
        }).then(order => {
            if (!order) {
                res.redirect('/');
            }
            res.render("checkout", { order: order, checkoutToken: authToken });
            res.end();
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

global.server.app.get(['/checkout/:authToken/:orderId/download'], function (req, res) {
    var authToken = req.params.authToken;
    var orderId = req.params.orderId;
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        try {
            db.Order.findOne({
                where: { hash: orderId }
            }).then(order => {
                if (!order) {
                    res.redirect('/');
                }

                const zipPath = config.get('ZIP_PATH');
                const zipName = `${orderId}_${order.name != null ? order.name : ''}-${order.surname != null ? order.surname : ''}.zip`;
                const destinationPath = path.join(zipPath, zipName);
                const sourcePath = path.join(config.get('PHOTO_UPLOAD_PATH'), `/${orderId}`);
                fs.mkdirp(zipPath, function(err) {
                    if (err) {
                        res.redirect('/');
                        res.end();
                    } else {
                        if (fs.pathExistsSync(destinationPath)) {
                            res.download(destinationPath, zipName);
                        } else {
                            var zip = require('bestzip');
                            zip({
                                source: '*',
                                destination: destinationPath,
                                cwd: sourcePath
                            }).then(function () {
                                res.download(destinationPath, zipName);
                            });
                        }
                    }
                });

            });
        } catch (e) {
            res.redirect('/');
            res.end();
        }
    } else {
        res.redirect('/');
        res.end();
    }
});