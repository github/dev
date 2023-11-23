const { addKeyword } = require("@bot-whatsapp/bot");
const retry = require('../data/bot')
const flowRetryOrNot = require('./retry')
const flowAccept = addKeyword(["1", "Si"], { sensitive: true })
  .addAnswer(
    "¿Podrías indicarme tu nombre completo?",
    { capture: true },
    async (ctx, { state }) => {
      await state.update({ name: ctx.body });
    }
  )
  .addAnswer('')
  .addAnswer(
    "Ingresa el *NIT*.Si eres una persona natural tu *NUMERO DE IDENTIFICACIÓN*",
    { capture: true },
    async (ctx, { state, fallBack, flowDynamic }) => {
      if (retry == 2) {
        await flowDynamic(
          "🤨 Parece que tienes problemas, intenta colocar el *NIT/NUMERO DE IDENTIFICACIÓN* sin puntos comas u otros caracteres *Ejm:* 123456789"
        );
      }
      if (ctx.body.includes(".") | ctx.body.includes(",")) {
        retry += 1;
        return fallBack();
      }
      await state.update({ document: ctx.body });
    }
  )
  .addAnswer(
    "Y podrías indicarme el *NOMBRE DE LA EMPRESA*, en caso de no ser parte de una organizacion ingresar *(***)*",
    { capture: true },
    async (ctx, { state }) => {
      await state.update({ company: ctx.body });
    }
  )
  .addAction(async (ctx, { state, flowDynamic, gotoFlow }) => {
    const { name, document, company } = state.getMyState();
    const url_img = `https://upcdn.io/12a1ygh/image/Frame.png?text=${name}&layer-x=363&layer-y=646&font-size=200&text=${document}&layer-x=267&layer-y=707&font-size=200&text=${company}&layer-x=627&layer-y=767&font-size=200`;
    await flowDynamic([
      {
        body: "Tu Informacion",
        media: url_img,
      },
    ]);
    return gotoFlow(flowRetryOrNot);
  });
module.exports = flowAccept