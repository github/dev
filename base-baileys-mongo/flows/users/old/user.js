const { addKeyword } = require("@bot-whatsapp/bot");
const namebot = require('../../../data/bot')
const flowUserIsExist = addKeyword("USER_IS_NOT_REGISTER").addAction(
  async (ctx, { flowDynamic, state, endFlow }) => {
      const name_user = state.getMyState();
      await flowDynamic([
        "👋 Bienvenido(a) a Industrial Solutons Colombia #IscSA.",
        "",
        `¡Hola, *${name_user?.name}* soy ${namebot}! 🤖 Tu asesor virtual, estoy listo para ayudarte y resolver tus dudas.`,
      ]);
      return endFlow("En un momento estaremos contigo ...");
  }
);
module.exports = flowUserIsExist;
