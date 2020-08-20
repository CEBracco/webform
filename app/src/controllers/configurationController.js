const APIResponse = require('@appSrc/utils/apiResponse');
var config = require('@localModules/config/Config.js');

global.server.app.post(['/configuration/:authToken/refresh'], function (req, res) {
    var authToken = req.params.authToken;
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        global.configurationCache.refresh();
        res.send(APIResponse.ok());
        res.end();
    } else {
        res.send(APIResponse.error());
        res.end();
    }
});
