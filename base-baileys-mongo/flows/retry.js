const { addKeyword } = require("@bot-whatsapp/bot");
const flowRetryOrNot = addKeyword("RETRY_OR_NOT_INFORMATION").addAnswer(
    [
      "¿Es correcta? *Si* o *No*",
      "",
      "*Nota ✏:*  recuerda que tu información debe quedar correcta, ya que te registraré en nuestro sistema y no te la volveré a pedir",
    ],
    { capture: true },
    async (ctx, { gotoFlow }) => {
      if (ctx.body.includes("Si")) {
        return gotoFlow(require('./bd/save'));
      }
  
      if (ctx.body.includes("No")) {
        return gotoFlow(require('./accept'));
      }
    }
  );
module.exports = flowRetryOrNot  