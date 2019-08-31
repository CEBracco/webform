const db = global.db;
var config = require('@localModules/config/Config.js');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
const APIResponse = require('@appSrc/utils/apiResponse');

global.server.app.get(['/photo_upload/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId }, include: [db.Product] }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        res.render("photo_upload", { order: order, photos: getUploadedPhotos(orderId) });
        res.end();
    });
});


function getUploadedPhotos(orderId) {
    let orderPhotoDir = path.join(config.get('PHOTO_UPLOAD_PATH'), orderId);
    let photos = []
    mkdirp.sync(orderPhotoDir)
    fs.readdirSync(orderPhotoDir).forEach(file => {
        photos.push(file);
    });
    return photos;
}

global.server.app.get(['/photos/:orderId/:filename'], function (req, res) {
    if (!req.params.orderId || !req.params.filename) {
        res.send(APIResponse.error());
        res.end();
    }
    var orderId = req.params.orderId;
    var filename = req.params.filename;
    var photoPath =  `/${orderId}/${filename}`;
    res.sendFile(photoPath, { root: config.get('PHOTO_UPLOAD_PATH') });
});

global.server.app.delete(['/photos/:orderId/:filename'], function (req, res) {
    if (!req.params.orderId || !req.params.filename) {
        res.send(APIResponse.error());
        res.end();
    }
    var orderId = req.params.orderId;
    var filename = req.params.filename;
    var photoPath = path.join(config.get('PHOTO_UPLOAD_PATH'), `/${orderId}/${filename}`);
    fs.unlink(photoPath, function(err) {
        if (err) {
            res.send(APIResponse.error());
        }
        res.send(APIResponse.ok());
    });
});

global.server.app.post(['/photo_upload/:orderId/upload'], function (req, res) {
    var orderId = req.params.orderId;
    if (Object.keys(req.files).length == 0) {
        res.send(APIResponse.error(null, 'No se cargó ningún archivo'));
        res.end();
    }
    let photo = req.files.photo;
    var photoPath = path.join(config.get('PHOTO_UPLOAD_PATH'), `/${orderId}/${photo.name}-${Date.now()}`);
    
    mkdirp(path.join(config.get('PHOTO_UPLOAD_PATH'), orderId), function (err) {
        if (err) {
            res.send(APIResponse.error());
        }
        photo.mv(photoPath, function (err) {
            if (err) {
                res.send(APIResponse.error());
            }
            res.send(APIResponse.ok());
            res.end();
        });
    });
});