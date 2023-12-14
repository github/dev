const { addKeyword } = require("@bot-whatsapp/bot");
const { get_info }  = require('../bd/clients')
const flowPrincipal = addKeyword(["hola", "ola"]).addAction(
    async (ctx, { database, state, gotoFlow }) => {
      try {
        const cursor = await database.db
          .collection("users")
          .find({ from: `${ctx.from}` })
          .toArray();
        if (cursor.length > 0) {
          await state.update({ name: cursor[0].name });
          return gotoFlow(require('./users/old/user')) ;
        } else {
          return gotoFlow(require('./users/new/user'));
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
module.exports = flowPrincipal  