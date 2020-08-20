configRepository = process.env.CONFIG_REPOSITORY ? process.env.CONFIG_REPOSITORY : 'env';
repository = require(`./repository/${configRepository}Repository.js`);
databaseRepository = null

class Config {

  constructor(){}

  get(key) {
    return repository.get(key);
  }

  getBoolean(key) {
    return repository.getBoolean(key);
  }
  
  getObject(key) {
    try {
      return repository.getObject(key);
    } catch (error) {
      return null;
    }
  }

  get db() {
    if (!databaseRepository) databaseRepository = require(`./repository/databaseRepository.js`);
    return databaseRepository;
  }
}

module.exports = new Config()
