const commands = [
  {
    id: '!rules',
    exec: (dispatcher, message) => dispatcher.rules(message),
    description: 'Avisa al usuario mencionado sobre su comportamiento'
  },
  {
    id: '!help',
    exec: (dispatcher, message) => dispatcher.help(message),
    description: 'Muestra todos los comandos'
  },
  {
    id: '!desc',
    exec: (dispatcher, message) => dispatcher.description(message),
    description: 'Devuelve la descripción para el live'
  }
]

module.exports = commands