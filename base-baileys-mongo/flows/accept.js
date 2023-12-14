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
    "Ingresa el *NIT* de tu empresa o si eres una persona natural tu *NUMERO DE IDENTIFICACIÓN*",
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
    "En caso de no ser un cliente activo de ISC podrías indicarme el *NOMBRE DE TU EMPRESA*.  En caso de no ser parte de una organización digitar (*)",
    { capture: true },
    async (ctx, { state }) => {
      await state.update({ company: ctx.body });
    }
  )
  .addAction(async (ctx, { state, flowDynamic, gotoFlow }) => {
    const { name, document, company } = state.getMyState();
    await flowDynamic(
      [
        `Tu informacion : *Nombre*: ${name} *NIT*: ${document} *Nombre de Empresa*: ${company}`
      ]
  );
    return gotoFlow(flowRetryOrNot);
  });
module.exports = flowAccept