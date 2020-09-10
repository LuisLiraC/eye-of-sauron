const commands = require('./Commands')
const undefinedDevs = require('../lib/UndefinedDevs')
const channels = require('../lib/Channels')
const emojis = require('../lib/Emojis')
const Validator = require('../utils/Validator')

const { logger, channelLogger } = require('../utils/Logger')
const {
  getGuildMemberByMessage,
  getChannelById,
  getChannelByName,
  getEmojiById
} = require('../utils/Discord')

class AdminBehavior {
  constructor(client, db) {
    this.client = client
    this.db = db
    this.validator = new Validator(db)
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
        `▶ ${c.id} --> ${c.description}\n`
      )).join('')

      const channel = getChannelById(message, channels.undefinedDevsBots)
      const member = getGuildMemberByMessage(message)
      channel.send(`${member} \`\`\`Lista de comandos:\n${result}\`\`\``)
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

  raffle(message) {
    try {
      const messageToReactId = message.id

      const exists = this.db.get('raffles')
        .find({ 'message_id': messageToReactId })
        .value()

      if (!exists) {
        this.db.get('raffles')
          .push({
            'message_id': messageToReactId,
            'reactions': []
          })
          .write()
      }
    } catch (error) {
      logger('raffle command', error)
    }
  }

  addParticipant(messageId, user) {
    try {

      const registeredUsers = this.db.get('raffles')
        .find({ 'message_id': messageId })
        .get('reactions')
        .value()

      if (registeredUsers.includes(user.id)) return

      this.db.get('raffles')
        .find({ 'message_id': messageId })
        .get('reactions')
        .push(user.id)
        .write()
    } catch (error) {
      logger('add participant', error)
    }

  }

  announceWinner(message) {
    try {
      const [messageId] = message.content.match(/[0-9]{18,}/)
      const isRaffle = this.validator.isRaffle(messageId)

      if (isRaffle) {
        const users = this.db.get('raffles')
          .find({ 'message_id': messageId })
          .get('reactions')
          .value()

        const randomNum = Math.floor(Math.random() * users.length)
        const winner = users[randomNum]
        const emoji = getEmojiById(this.client, emojis.xmaxCheems)

        message.reply(`Felicidades <@${winner}> ganaste la rifa del día hoy ${emoji}`)
      } else {
        channelLogger(message, channel.undefinedDevsBots)
      }
    } catch (error) {
      logger('announcer winner', error)
    }
  }

  viewParticipants(message) {
    try {
      const [messageRegistered] = message.content.match(/[0-9]{18,}/g)
      const isRaffle = this.validator.isRaffle(messageRegistered)

      if (isRaffle) {
        const users = this.db.get('raffles')
          .find({ 'message_id': messageRegistered })
          .get('reactions')
          .value()

        const result = users.map(id => ` <@${id}> `).join('')

        message.reply(`Particpantes: ${result}`)
      } else {
        channelLogger(message, channel.undefinedDevsBots)
      }
    } catch (error) {
      logger('view participants', error)
    }
  }

  emergency(message) {
    try {
      const channel = getChannelById(message, channels.organization)
      channel.send('@here', { files: ['https://i.ibb.co/02hWZ3C/emergency.png']})
    } catch (error) {
      logger('emergency command', error)
    }
  }
}

module.exports = AdminBehavior