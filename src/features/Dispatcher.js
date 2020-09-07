const commands = require('./Commands')
const undefinedDevs = require('../lib/UndefinedDevs')
const channels = require('../lib/Channels')
const emojis = require('../lib/Emojis')
const messages = require('../lib/Messages')

const logger = require('../utils/Logger')
const {
  getGuildMemberByMessage,
  getChannelById,
  getChannelByName,
  getEmojiById
} = require('../utils/Discord')

class Dispatcher {
  constructor(client) {
    this.client = client
  }

  welcome(member) {
    try {
      const channel = getChannelByName(member, '🖖-welcome')
      if (!channel) return
      const emoji = getEmojiById(this.client, emojis.linkPepe)
      const rulesChannel = getChannelByName(member, '🦧-reglas').toString()
      channel.send(`¡Hola ${member}! Bienvenvid@ a la comunidad de Undefined Devs ${emoji}\nLee nuestro canal de ${rulesChannel} para comenzar a participar en la comunidad.`)
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
      const messageId = reaction.message.id
      const member = reaction.message.guild.member(user)
      if (member && messageId === messages.rulesMessage) {
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

  rules(message) {
    try {
      const user = message.mentions.users.first()
      if (user) {
        const member = message.guild.member(user)
        if (member) {
          const channel = getChannelByName(member, '☝🏼-moderación')
          const emoji = getEmojiById(this.client, emojis.pepeRules)
          const rulesChannel = getChannelById(message, channels.rulesChannel).toString()
          channel.send(`${emoji} ${member} tu comportamiento no está siendo el adecuado, te recomendamos leer las reglas de nuevo ${rulesChannel}`)
        }
      }
    } catch (error) {
      logger('rules command', error)
    }
  }

  help(message) {
    try {
      const result = commands.map(c => (
        `${c.id} --> ${c.description}\n`
      )).join('')

      const channel = getChannelById(message, channels.undefinedDevsBots)
      const member = getGuildMemberByMessage(message)
      channel.send(`${member} Lista de comandos:\n${result}`)
    } catch (error) {
      logger('help command', error)
    }
  }

  description(message) {
    try {
      const participants = message.mentions.users.array()
      let result = `En este #UndefinedLive estaremos hablando sobre [insertar descripción del tema]\n\nSi te gustan estos lives no olvides compartir y seguirnos en nuestras redes 😁👇🏼\n\nParticipantes:\n`

      
      participants.forEach(p => {
        const ud = undefinedDevs.find(u => u.id === p.id)
        if (ud) {
          result += `👉 ${ud.name}:\n<${ud.youtube}>\n<${ud.twitter}>\n`
        }
      })

      result += `\nDiscord: <https://discord.gg/UKPbV3j>\n\nLive anterior: [insertar link del live]`
      const channel = getChannelById(message, channels.undefinedDevsBots)
      const member = getGuildMemberByMessage(message)
      channel.send(`${member} Descripción:\n${result}`)
    } catch (error) {
      logger('description command', error)
    }
  }

  love(message) {
    try {
      const channel = getChannelById(message, channels.generalBots)
      channel.send(`Buenos días, buenas tardes, buenas noches, recuerden que los queremos mucho`, { files: ['https://i.imgur.com/QrBXmAC.jpg'] })
    } catch (error) {
      logger('love command', error)
    }
  }

  getToWorkFran(message) {
    try {
      const channel = getChannelById(message, channels.undefinedDevsBots)
      const franId = undefinedDevs.find(ud => ud.name === 'Frandeveloper').id
      channel.send(`Ya ponte a jalar <@${franId}>`)
    } catch (error) {
      logger('fran command', error)
    }
  }

}

module.exports = Dispatcher