var config = require('@localModules/config/Config.js');
const NotificationBroker = require('@appSrc/notification/notificationBroker');

global.server.app.get(['/lab/:fileCode/download'], function (req, res) {
    var fileHashComponents = req.params.fileCode.split('v')
    if (fileHashComponents.length >= 2) {
        var downloadLink = constructLink(fileHashComponents[0], fileHashComponents[1])
        NotificationBroker.sendLabDownloadNotification(downloadLink);
        res.render("lab_download", { 
            title: "¡Gracias por descargar el pedido!", 
            detail: "La descarga del pedido se iniciara automáticamente, en caso contrario podes descargarlo haciendo click en el botón \"Descargar\".",
            link: downloadLink
        });
        res.end();
    } else {
        res.redirect('/');
    }
});

function constructLink(timestamp, generation) {
    var fileUploadPrefix = config.get('FILE_UPLOAD_PREFIX');
    var fileUStoragePath = config.get('FILE_STORAGE_PATH');
    var filename = `${fileUploadPrefix}-${timestamp}.zip`;
    return `https://storage.googleapis.com/download/storage/v1/b/${fileUStoragePath}/o/${filename}?generation=${generation}&alt=media`
}