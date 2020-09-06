const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const Dispatcher = require('./features/Dispatcher')
const Validator = require('./utils/Validator')
const commands = require('./features/Commands')

client.login(config.token)

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '🖖-welcome')
  if (!channel) return
  const emoji = this.client.emojis.cache.get('724816411733786808')
  channel.send(`¡Hola ${member}! Bienvenvid@ a la comunidad de Undefined Devs ${emoji}`)
})

client.on('message', message => {
  if (!message.guild) return
  if (message.author.bot) return

  const validator = new Validator()
  const id = message.author.id

  if (validator.isUndefinedDev(id) && message.content.startsWith('!')) {
    const dispatcher = new Dispatcher(client)
    const messageStart = message.content.replace(/(![a-zA-Z]{0,9}) .*/, '$1')
    const command = commands.find(c => c.id === messageStart)

    command
      ? command.exec(dispatcher, message)
      : message.reply('el comando no existe, usa `!help` para mostrar la lista de comandos')
  } else if (!validator.isUndefinedDev(id) && message.content.startsWith('!')) {
    message.reply('', { files: ['https://i.pinimg.com/564x/e8/17/80/e8178017c48860752523cc080af84d57.jpg'] })
  }
})