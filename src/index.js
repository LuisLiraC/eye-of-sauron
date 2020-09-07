const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const config = require('./config')
const Dispatcher = require('./features/Dispatcher')
const Validator = require('./utils/Validator')
const commands = require('./features/Commands')

client.login(config.token)
const dispatcher = new Dispatcher(client)

client.on('guildMemberAdd', member => {
  dispatcher.welcome(member)
  dispatcher.setUnverified(member)
})

client.on('message', message => {
  if (!message.guild) return
  if (message.author.bot) return

  const validator = new Validator()
  const id = message.author.id

  if (validator.isUndefinedDev(id) && message.content.startsWith('!')) {
    const messageStart = message.content.replace(/(![a-zA-Z]{0,9}) .*/, '$1')
    const command = commands.find(c => c.id === messageStart)

    command
      ? command.exec(dispatcher, message)
      : message.reply('el comando no existe, usa `!help` para mostrar la lista de comandos')
  } else if (!validator.isUndefinedDev(id) && message.content.startsWith('!')) {
    dispatcher.hijole(message)
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  dispatcher.removeUnverified(reaction, user)
})