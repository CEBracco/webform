const NodeCache = require("node-cache");
const logger = require('@localModules/logger/Logger.js');

class ConfigurationCache {

    cache = null;

    constructor() {
        this.refresh()
    }

    refresh() {
        if (this.cache) {
            this.cache.close();
        }
        this.cache = new NodeCache();
        //load configuration on cache
        logger.info("Loading configuration on cache...")
        global.db.Configuration.findAll().then(configurations => {
            configurations.forEach(configuration => {
                this.cache.set(configuration.name, this.getTypedValue(configuration))
            });
        })
    }

    getTypedValue(configuration) {
        switch (configuration.type) {
            case 'Object':
                try {
                    return JSON.parse(configuration.value);
                } catch (error) {
                    return configuration.value;
                }
            case 'Boolean':
                return (configuration.value === 'true');
            default:
                return configuration.value;
        }
    }

    get(key) {
        return this.cache.get(key)
    }
}

module.exports = new ConfigurationCache()