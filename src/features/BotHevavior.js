const channels = require('../lib/Channels')
const emojis = require('../lib/Emojis')

const { logger } = require('../utils/Logger')
const {
  getGuildMemberByMessage,
  getChannelById,
  getChannelByName,
  getEmojiById
} = require('../utils/Discord')

class BotBehavior {
  welcome(member) {
    try {
      const channel = getChannelByName(member, '🖖-welcome')
      if (!channel) return
      const emoji = getEmojiById(this.client, emojis.linkPepe)
      const rulesChannel = getChannelByName(member, '🦧-reglas').toString()
      channel.send(`¡Hola ${member}! Bienvenvid@ a la comunidad de Undefined Devs ${emoji}\nLee nuestro canal de ${rulesChannel} hasta el final y sigue las instrucciones para poder entrar a todos los canales.`)
    } catch (error) {
      logger('welcome method', error)
    }
  }

  setUnverified(member) {
    try {
      let role = member.guild.roles.cache.find(r => r.name === 'unverified')
      member.roles.add(role)
    } catch (error) {
      logger('set unverified method', error)
    }
  }

  removeUnverified(reaction, user) {
    try {
      const member = reaction.message.guild.member(user)
      if (member) {
        let role = member.guild.roles.cache.find(r => r.name === 'unverified')
        member.roles.remove(role)
        const channel = getChannelById(reaction.message, channels.undefinedDevsBots)
        channel.send(`${member} ha reaccionado a las reglas`)
      }
    } catch (error) {
      logger('remove unverified method', error)
    }
  }

  hijole(message) {
    try {
      const channel = getChannelById(message, channels.generalBots)
      const member = getGuildMemberByMessage(message)
      channel.send(`${member}`, { files: ['https://i.pinimg.com/564x/e8/17/80/e8178017c48860752523cc080af84d57.jpg'] })
    } catch (error) {
      logger('hijole method', error)
    }
  }
}

module.exports = BotBehavior