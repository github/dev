const { addKeyword } = require("@bot-whatsapp/bot");
const flowAccept = require('./accept')
const namebot = require('../data/bot')
const flowView = addKeyword("2", { sensitive: true })
  .addAnswer("Terminos y Condiciones", {
    media: "/workspaces/dev/base-baileys-mongo/pictures/Snow.png",
  })
  .addAnswer(
    ["Aceptas nuestros terminos y condiciones ?", "*Si* o *No*"],
    { capture: true },
    async (ctx, { endFlow }) => {
      if (ctx.body.includes("No")) {
        return endFlow(
          `Gracias por visitar *${namebot}!* 🤖 para continuar con la conversación, es necesario que aceptes y de manera correcta nuestros terminos y condiciones. Recuerda que estoy listo para ayudarte.`
        );
      }
    },
    [flowAccept]
  );
module.exports = flowView