const { addKeyword } = require("@bot-whatsapp/bot");
const flowSaveResponse = addKeyword("SAVE_RESPONSE").addAction(
    async (ctx, { database, flowDynamic, state }) => {
      const myState = state.getMyState();
      try {
        ctxWithDate = {
          name_wp: ctx.pushName,
          name: myState.name,
          document: myState.document,
          company: myState.company,
          from: ctx.from,
          date: new Date(),
          context: {
            ctx,
          },
          state: {
            myState,
          },
        };
        const cursor = await database.db
          .collection("users")
          .insertOne(ctxWithDate);
        await flowDynamic("😊 Muchas Gracias, ya te registramos ");
      } catch (error) {
        console.log(error);
      }
    }
  );
module.exports = flowSaveResponse  