const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const Dispatcher = require('./features/Dispatcher')
const Validator = require('./utils/Validator')
const config = require('./config')
const commands = require('./features/Commands')
const messages = require('./lib/Messages')
const { find } = require('./lib/UndefinedDevs')

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const adapter = new FileSync('./src/lib/db.json')
const db = low(adapter)

db.defaults({})

client.login(config.token)
const validator = new Validator(db)
const dispatcher = new Dispatcher(client, db, validator)

client.on('guildMemberAdd', member => {
  dispatcher.welcome(member)
  dispatcher.setUnverified(member)
})

client.on('message', message => {
  if (!message.guild) return
  if (message.author.bot) return

  const id = message.author.id
  const messageCommand = message.content.replace(/(![a-zA-Z]{0,9}) .*/, '$1')
  const command = commands.find(c => c.id === messageCommand)

  if (validator.isUndefinedDev(id) && message.content.startsWith('!')) {
    command
      ? command.exec(dispatcher, message)
      : message.reply('el comando no existe, usa `!help` para mostrar la lista de comandos')
  } else if (!validator.isUndefinedDev(id) && message.content.startsWith('!')) {
    const command = commands.find(c => c.id === messageCommand)
    command && dispatcher.hijole(message)
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  const messageId = reaction.message.id

  if (messageId === messages.rulesMessage) {
    dispatcher.removeUnverified(reaction, user)
  }
  
  const isRaffle = validator.isRaffle(messageId)

  if (isRaffle) {
    dispatcher.addParticipant(messageId, user)
  }
})