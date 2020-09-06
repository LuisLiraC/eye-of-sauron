const commands = require('./Commands')
const undefinedDevs = require('../lib/UndefinedDevs')

class Dispatcher {
  constructor(client) {
    this.client = client
  }

  rules(message) {
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
  }

  help(message) {
    let result = ''
    commands.forEach(c => {
      result += `${c.id} --> ${c.description}\n`
    })
    message.reply(`Lista de comandos\n${result}`)
  }

  description(message) {
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
  }
}

module.exports = Dispatcher