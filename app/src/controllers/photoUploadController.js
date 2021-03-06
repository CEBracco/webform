const db = global.db;
var config = require('@localModules/config/Config.js');
var path = require('path');
var fs = require('fs-extra');
const OrderPhotosUtils = require('@appSrc/utils/orderPhotosUtils');
const APIResponse = require('@appSrc/utils/apiResponse');

global.server.app.get(['/photo_upload/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId }, include: [db.Product] }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        res.render("photo_upload", { order: order, photos: OrderPhotosUtils.getUploadedPhotos(orderId) });
        res.end();
    });
});

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
    let chunk = req.files.photo;
    var photoChunkDir = path.join(config.get('UPLOAD_TEMP_PATH'), `/${orderId}/${chunk.name}`);
    var photoChunkPath = path.join(photoChunkDir, `${Date.now()}-${chunk.name}`);
    
    fs.mkdirp(photoChunkDir, function (err) {
        if (err) {
            res.send(APIResponse.error());
        }
        chunk.mv(photoChunkPath, function (err) {
            if (err) {
                res.send(APIResponse.error());
            }
            res.send(APIResponse.ok());
            res.end();
        });
    });
});

global.server.app.post(['/photo_upload/:orderId/:filename/process'], function (req, res) {
    if (!req.params.orderId || !req.params.filename) {
        res.send(APIResponse.error());
        res.end();
    }
    var orderId = req.params.orderId;
    var filename = req.params.filename;
    try {
        processFile(orderId, filename, function() {
            res.send(APIResponse.ok());
            res.end();
        });
    } catch (error) {
        res.send(APIResponse.error());
        res.end();
    }
})

function processFile(orderId, filename, complete) {
    const uploadDir = path.join(config.get('PHOTO_UPLOAD_PATH'), `/${orderId}`);
    const uploadTempDir = path.join(config.get('UPLOAD_TEMP_PATH'), `/${orderId}`);
    const chunkDir = path.join(uploadTempDir, filename);
    let outputFile = fs.createWriteStream(path.join(uploadDir, filename));
    fs.readdir(chunkDir, function (error, filenames) {
        if (error) {
            // throw new Error('Cannot get upload chunks!');
            return complete()
        }

        //loop through the temp dir and write to the stream to create a new file
        filenames.forEach(function (tempName) {
            const data = fs.readFileSync(`${chunkDir}/${tempName}`);
            outputFile.write(data);
            //delete the chunk we just handled
            fs.removeSync(`${chunkDir}/${tempName}`);
        });

        outputFile.end();
    });

    outputFile.on('finish', async function () {
        //delete the temp folder once the file is written
        fs.removeSync(chunkDir);
        complete()
    });
}

global.server.app.post(['/photos/:orderId/:filename/generateThumbnail'], function (req, res) {
    if (!req.params.orderId || !req.params.filename || !req.body.dataUrl) {
        res.send(APIResponse.error());
        res.end();
    }
    generateThumbnail(req.params.orderId, req.params.filename, req.body.dataUrl);
    res.send(APIResponse.ok());
});

function generateThumbnail(orderId, filename, dataUrl) {
    const thumbnailsDirPath = path.join(config.get('PHOTO_THUMBNAILS_PATH'), `/${orderId}`);
    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var matches = dataUrl.match(regex);

    if (matches) {
        fs.mkdirp(thumbnailsDirPath, function (err) {
            var fs = require('fs');
            var ext = matches[1];
            var data = matches[2];
            var buffer = Buffer.from(data, 'base64');
            fs.writeFileSync(path.join(thumbnailsDirPath, filename), buffer);
        });
    }
}

global.server.app.get(['/photos/:orderId/:filename/thumbnail'], function (req, res) {
    if (!req.params.orderId || !req.params.filename) {
        res.send(APIResponse.error());
        res.end();
    }
    var orderId = req.params.orderId;
    var filename = req.params.filename;
    var photoPath = `/${orderId}/${filename}`;
    if (fs.existsSync(path.join(config.get('PHOTO_THUMBNAILS_PATH'), photoPath))) {
        res.sendFile(photoPath, { root: config.get('PHOTO_THUMBNAILS_PATH') });
    } else {
        res.sendFile(photoPath, { root: config.get('PHOTO_UPLOAD_PATH') });
    }
});