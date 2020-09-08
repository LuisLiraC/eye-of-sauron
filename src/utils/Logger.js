function logger(method, error) {
  console.log(`[error] [${method}] ${error}`)
}

function channelLogger(message, channelId) {
  const channel = getChannelById(message, channelId)
  const member = getGuildMemberByMessage(message)
  channel.send(`${member} El ID del comentario no se encontró`)
}

module.exports = {
  logger,
  channelLogger
}