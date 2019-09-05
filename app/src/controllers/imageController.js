var config = require('@localModules/config/Config.js');
const APIResponse = require('@appSrc/utils/apiResponse');

global.server.app.get(['/images/:firstPart/:secondPart?'], function (req, res) {
    if (!req.params.firstPart) {
        res.send(APIResponse.error());
        res.end();
    }
    var secondPart = req.params.secondPart ? `/${req.params.secondPart}` : '';
    var filepath = `/${req.params.firstPart}` + secondPart;
    res.sendFile(filepath, { root: config.get('IMAGE_ASSETS_PATH') });
});