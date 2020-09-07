const undefinedDevs = require('../lib/UndefinedDevs')
const logger = require('../utils/Logger')

class Validator {
  constructor(db) {
    this.db = db
  }

  isUndefinedDev(id) {
    const result = undefinedDevs.find(ud => ud.id === id)
    return result ? true : false
  }

  isRaffle(messageId) {
    try {
      const result = this.db.get('raffles')
        .find({ 'message_id': messageId })
        .value()

      return result
    } catch (error) {
      logger('is raffle method', error)
    }
  }
}

module.exports = Validator