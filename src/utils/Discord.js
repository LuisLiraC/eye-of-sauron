function getGuildMemberByMessage(message) {
  const user = message.author
  const member = message.guild.member(user)
  return member
}

function getChannelById(message, id) {
  const channel = message.guild.channels.cache.find(ch => ch.id === id)
  return channel
}

function getChannelByName(member, channelName) {
  const channel = member.guild.channels.cache.find(ch => ch.name === channelName)
  return channel
}

function getEmojiById(member, emojiId) {
  const emoji = member.client.emojis.cache.get(emojiId)
  return emoji
}


module.exports = {
  getGuildMemberByMessage,
  getChannelById,
  getChannelByName,
  getEmojiById
}