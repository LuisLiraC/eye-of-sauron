const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./src/lib/db.json')
const db = low(adapter)
db.defaults({})

const AdminBehavior = require('./features/AdminBehavior')
const BotBehavior = require('./features/BotHevavior')
const config = require('./config')
const commands = require('./features/Commands')
const messages = require('./lib/Messages')

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(config.token)

const adminBehavior = new AdminBehavior(client, db)
const botBehavior = new BotBehavior(client)

client.on('guildMemberAdd', member => {
  botBehavior.welcome(member)
  botBehavior.setUnverified(member)
})

client.on('message', message => {
  if (!message.guild || message.author.bot) return

  const id = message.author.id
  const messageCommand = message.content.replace(/(![a-zA-Z]{0,9}) .*/, '$1')
  const command = commands.find(c => c.id === messageCommand)
  const isCommand  = message.content.startsWith('!')
  const isUd = adminBehavior.validator.isUndefinedDev(id)

  if (isUd && isCommand) {
    command
      ? command.exec(adminBehavior, message)
      : message.reply('el comando no existe, usa `!help` para mostrar la lista de comandos')
  } else if (!isUd && isCommand) {
    command && botBehavior.hijole(message)
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  const messageId = reaction.message.id

  if (messageId === messages.rulesMessage) {
    botBehavior.removeUnverified(reaction, user)
  }

  const isRaffle = adminBehavior.validator.isRaffle(messageId)

  if (isRaffle) {
    adminBehavior.addParticipant(messageId, user)
  }
})