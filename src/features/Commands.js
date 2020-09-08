const commands = [
  {
    id: '!rules',
    exec: (dispatcher, message) => dispatcher.rules(message),
    description: 'Avisa al usuario mencionado sobre su comportamiento\n        Ejemplo: !rules @FranyerRangel (Frandeveloper)👨💻'
  },
  {
    id: '!help',
    exec: (dispatcher, message) => dispatcher.help(message),
    description: 'Muestra todos los comandos'
  },
  {
    id: '!desc',
    exec: (dispatcher, message) => dispatcher.description(message),
    description: 'Devuelve la descripción para el live con los integrantes mencionados\n        Ejemplo: !desc @musarte @Wiar8 @vurokrazia'
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
  },
  {
    id: '!raffle',
    exec: (dispatcher, message) => dispatcher.raffle(message),
    description: 'Retgistra el mensaje para que las personas puedan reaccioanr y participar en la rifa\n        Ejemplo: !raffle Reaccionen a este mensaje 😁        \n        Nota: Solo se registrarán las reacciones hechas después de usar este comando'
  },
  {
    id: '!part',
    exec: (dispatcher, message) => dispatcher.viewParticipants(message),
    description: 'Recibe un ID de mensaje y muestra las personas que han reaccionado\n        Ejemplo !part 724861047768350831'
  },
  {
    id: '!winner',
    exec: (dispatcher, message) => dispatcher.announceWinner(message),
    description: 'Recibe el ID de un mensaje registrado con !raffle para elegir un ganador de forma aleatoria\n        Ejemplo: !winner 724861047768350831        \n        Nota: El bot responde en el canal que fue invocado y mencionan al ganador'
  }
]

module.exports = commands