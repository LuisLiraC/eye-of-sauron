const commands = [
  {
    id: '!rules',
    exec: (dispatcher, message) => dispatcher.rules(message),
    description: 'Avisa al usuario mencionado sobre su comportamiento\n    Ejemplo: !rules @FranyerRangel (Frandeveloper)👨💻'
  },
  {
    id: '!help',
    exec: (dispatcher, message) => dispatcher.help(message),
    description: 'Muestra todos los comandos'
  },
  {
    id: '!desc',
    exec: (dispatcher, message) => dispatcher.description(message),
    description: 'Devuelve la descripción para el live con los integrantes mencionados\n    Ejemplo: !desc @musarte @Wiar8 @vurokrazia'
  },
  {
    id: '!love',
    exec: (dispatcher, message) => dispatcher.love(message),
    description: 'Les dice a todos que los queremos'
  },
  {
    id: '!fj',
    exec: (dispatcher, message) => dispatcher.getToWorkFran(message),
    description: 'Le dice a Fran que se ponga a jalar'
  }
]

module.exports = commands