const { addKeyword } = require("@bot-whatsapp/bot");
const flowView = require('../../view')
const flowAccept = require('../../accept')
const namebot  = require('../../../data/bot')

const flowUserNotExist = addKeyword("USER_IS_NOT_REGISTER")
  .addAnswer([
    `¡Hola, soy *${namebot}* 🤖 ! Estoy listo para ayudarte el día de hoy`,
  ])
  .addAnswer(
    [
      "Para continuar con la conversación es importante que apruebes nuestra política de términos y condiciones",
      "",
      "*1*. Aceptar",
      "*2*. Ver política de tratamiento de datos y Ley 2300",
      "*3*. Salir",
    ],
    null,
    null,
    [flowView, flowAccept]
  );
module.exports = flowUserNotExist  