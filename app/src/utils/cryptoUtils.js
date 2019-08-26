var config = require('@localModules/config/Config');
const Hashids = require('hashids');

function getHash(id) {
    var hashids = new Hashids(config.get('HASH_SECRET'), config.get('HASH_LENGHT'));
    return hashids.encode(id);
}

function getId(hash) {
    var hashids = new Hashids(config.get('HASH_SECRET'), config.get('HASH_LENGHT'));
    return hashids.decode(hash);
}

module.exports = {
    getHash: getHash,
    getId: getId
}