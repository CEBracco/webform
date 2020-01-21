function get(key){
  return process.env[key];
}

function getBoolean(key){
  return (get(key) === 'true');
}

function getObject(key) {
  return JSON.parse(get(key))
}

module.exports = {
  get:get,
  getBoolean:getBoolean,
  getObject:getObject
}
