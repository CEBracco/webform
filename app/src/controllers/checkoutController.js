const db = global.db;
var config = require('@localModules/config/Config.js');
var path = require('path');
var fs = require('fs');
var AdmZip = require('adm-zip');
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
                const zip = new AdmZip();
    
                OrderPhotosUtils.getUploadedPhotos(orderId).forEach(filename => {
                    zip.addLocalFile(path.join(config.get('PHOTO_UPLOAD_PATH'), `/${orderId}/${filename}`));
                });
    
                const downloadName = `${Date.now()}_${order.name != null ? order.name : ''}-${order.surname != null ? order.surname : ''}.zip`;
                const data = zip.toBuffer();
                res.set('Content-Type', 'application/octet-stream');
                res.set('Content-Disposition', `attachment; filename=${downloadName}`);
                res.set('Content-Length', data.length);
                res.send(data);
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