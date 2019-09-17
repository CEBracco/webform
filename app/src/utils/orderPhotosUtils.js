var config = require('@localModules/config/Config.js');
var path = require('path');
var fs = require('fs-extra');

function getUploadedPhotos(orderId) {
    let orderPhotoDir = path.join(config.get('PHOTO_UPLOAD_PATH'), orderId);
    let photos = []
    fs.mkdirpSync(orderPhotoDir)
    fs.readdirSync(orderPhotoDir).forEach(file => {
        photos.push(file);
    });
    return photos;
}

//remove temp images and useless thumbails
function cleanTempPhotos(orderId) {
    let orderTempPhotoDir = path.join(config.get('UPLOAD_TEMP_PATH'), orderId);
    let orderThumbsPhotoDir = path.join(config.get('PHOTO_THUMBNAILS_PATH'), orderId);
    let photos = getUploadedPhotos(orderId);

    //delete temp directory
    fs.remove(orderTempPhotoDir);

    //iterates over array and remove thumbnail if photo not exists
    fs.readdirSync(orderThumbsPhotoDir).forEach(thumbnail => {
        if(!photos.includes(thumbnail)){
            fs.remove(path.join(orderThumbsPhotoDir, thumbnail));
        }
    });
}

module.exports = {
    getUploadedPhotos: getUploadedPhotos,
    cleanTempPhotos: cleanTempPhotos
}