const commands = require('./Commands')
const undefinedDevs = require('../lib/UndefinedDevs')

class Dispatcher {
  constructor(client) {
    this.client = client
  }

  welcome(member) {
    try {
      const channel = member.guild.channels.cache.find(ch => ch.name === '🖖-welcome')
      if (!channel) return
      const emoji = this.client.emojis.cache.get('724816411733786808')
      channel.send(`¡Hola ${member}! Bienvenvid@ a la comunidad de Undefined Devs ${emoji}`)
    } catch (error) {
      console.log(`[error] [welcome command] ${error}`)
    }
  }

  hijole(message) {
    try {
      message.reply('', { files: ['https://i.pinimg.com/564x/e8/17/80/e8178017c48860752523cc080af84d57.jpg'] })
    } catch (error) {
      console.log(`[error] [hijole command] ${error}`)
    }
  }

  rules(message) {
    try {
      const user = message.mentions.users.first()
      if (user) {
        const member = message.guild.member(user)
        if (member) {
          const channel = member.guild.channels.cache.find(ch => ch.name === '☝🏼-moderación')
          const emoji = this.client.emojis.cache.get('752160268913475605')
          const rulesChannel = message.guild.channels.cache.get('724806034769575988').toString()
          channel.send(`${emoji} ${member} tu comportamiento no está siendo el adecuado, te recomendamos leer las reglas de nuevo ${rulesChannel}`)
        }
      }
    } catch (error) {
      console.log(`[error] [rules command] ${error}`)
    }
  }

  help(message) {
    try {
      let result = ''
      commands.forEach(c => {
        result += `${c.id} --> ${c.description}\n`
      })
      message.reply(`Lista de comandos\n${result}`)
    } catch (error) {
      console.log(`[error] [help command] ${error}`)
    }
  }

  description(message) {
    try {
      const participants = message.mentions.users.array()
      let result = `Descripción:\nEn este #UndefinedLive estaremos hablando sobre [insertar descripción del tema]\n\nSi te gustan estos lives no olvides compartir y seguirnos en nuestras redes 😁👇🏼\n\nParticipantes:\n`

      participants.forEach(p => {
        const ud = undefinedDevs.find(u => u.id === p.id)
        if (ud) {
          result += `👉 ${ud.name}:\n<${ud.youtube}>\n<${ud.twitter}>\n`
        }
      })

      result += `\nDiscord: <https://discord.gg/XFywjFJ>\n\nLive anterior: [insertar link del live]`

      message.reply(result)
    } catch (error) {
      console.log(`[error] [description command] ${error}`)
    }
  }

  love(message) {
    try {
      const channel = message.guild.channels.cache.find(ch => ch.name === '🏢-general')
      channel.send(`@everyone Buenos días, buenas tardes, buenas noches, recuerden que los queremos mucho`, { files: ['https://i.imgur.com/QrBXmAC.jpg'] })
    } catch (error) {
      console.log(`[error] [love command] ${error}`)
    }
  }
}

module.exports = Dispatcher