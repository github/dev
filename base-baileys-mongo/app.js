const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

require('dotenv').config()
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

/**
 * Declaramos las conexiones de Mongo
*/
let retry = 0
const namebot = "@ISCbot";
const MONGO_DB_URI = process.env.BD_URI
const MONGO_DB_NAME = process.env.BD_NAME



const flowSaveResponse = addKeyword('Si')
    .addAction(async (ctx, { database, flowDynamic,state }) => {
        const myState = state.getMyState()
        try {
            ctxWithDate = {
                id: ctx.id,
                name_wp: ctx.pushName,
                name : myState.name,
                document : myState.document,
                company : myState.company,
                from: ctx.from,
                date: new Date(),
            };
            const cursor = await database.db.collection('users').insertOne(ctxWithDate)
            await flowDynamic('😊 Muchas Gracias, ya te registramos ')
        } catch (error) {
            console.log(error)
        }
    })


const flowAccept = addKeyword(['1', 'Si'])
    .addAnswer(
        "¿Podrías indicarme tu nombre completo?",
        { capture: true },
        async (ctx, { state }) => {
            await state.update({ name: ctx.body })
        }
    )
    .addAnswer("Podrías indicarme el *NIT* de tu empresa sin digito de verificacion, puntos comas u otros carácteres.", { capture: true }, async (ctx, { state, fallBack, flowDynamic }) => {
        if (retry == 2) {
            await flowDynamic("🤨 Parece que tienes problemas, intenta colocar el NIT sin puntos comas u otros caracteres *Ejm:* 123456789")
        }
        if (ctx.body.includes('.') | ctx.body.includes(',')) {
            retry = retry + 1
            return fallBack()
        }
        await state.update({ document: ctx.body })

    })

    .addAnswer("Y podrías indicarme el *Nombre de la empresa*, si no pertence a ninguna organizacion colocar ***", { capture: true }, async (ctx, { state }) => {
        await state.update({ document: ctx.body })
    })

    .addAnswer("*Si* o *No*", {
        media: "/workspaces/dev/base-baileys-mongo/api/public/Frame.png",
    }, null, [flowSaveResponse])



const flowView = addKeyword("2")
    .addAnswer("Terminos y Condiciones", { media: "/workspaces/dev/base-baileys-mongo/doc/Snow.png" })
    .addAnswer(['Aceptas nuestros terminos y condiciones ?', '*Si* o *No*'], { capture: true }, null, [flowAccept])


const flowUserNotExist = addKeyword('USER_IS_NOT_REGISTER')
    .addAnswer([
        `¡Hola, soy *${namebot}* 🤖 ! Estoy listo para ayudarte el dia de hoy`,
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

/**  Welcome Message **/
const flowPrincipal = addKeyword(['hola', 'ola'])
    .addAction(async (ctx, { flowDynamic, database, endFlow,gotoFlow }) => {
        try {
            const cursor = await database.db.collection("users").find({ from: `${ctx.from}` }).toArray();

            if (cursor.length > 0) {
                await flowDynamic(`Hola Buenas Noches ${cursor[0].name}`);
                return endFlow('En un momento estaremos contigo ...')
            }else{
                return gotoFlow(flowUserNotExist)
            }
        } catch (error) {
            console.log(error);
        }
    })



const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: MONGO_DB_URI,
        dbName: MONGO_DB_NAME,
    });
    const adapterFlow = createFlow([flowPrincipal,flowUserNotExist]);
    const adapterProvider = createProvider(BaileysProvider);
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
    QRPortalWeb();
};

main();
