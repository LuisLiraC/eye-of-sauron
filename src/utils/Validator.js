const undefinedDevs = require('../lib/UndefinedDevs')

class Validator {
  isUndefinedDev(id) {
    const result = undefinedDevs.find(ud => ud.id === id)
    return result ? true : false
  }
}

module.exports = Validator