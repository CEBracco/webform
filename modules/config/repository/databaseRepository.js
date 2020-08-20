function get(key){
  return global.configurationCache.get(key);
}

function getBoolean(key){
  return get(key);
}

function getObject(key) {
  return get(key)
}

module.exports = {
  get:get,
  getBoolean:getBoolean,
  getObject:getObject
}
