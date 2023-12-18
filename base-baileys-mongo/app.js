const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
  addAnswer,
} = require("@bot-whatsapp/bot");

require("dotenv").config();
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MongoAdapter = require("@bot-whatsapp/database/mongo");

/**
 * Connect Mongo
 */

const MONGO_DB_URI = process.env.BD_URI;
const MONGO_DB_NAME = process.env.BD_NAME;

const flowSaveResponse = require('./flows/bd/save')

const flowRetryOrNot = require('./flows/retry')

/* Accept terms and conditions */
const flowAccept = require('./flows/accept')

/* See terms and conditions */
const flowView = require('./flows/view')

/* User does not exist */
const flowUserNotExist = require('./flows/users/new/user')

/* User does is exist */
const flowUserIsExist = require('./flows/users/old/user.js')

/**  Welcome Message **/
const flowPrincipal = require('./flows/welcome')

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([
    flowPrincipal,
    flowUserNotExist,
    flowUserIsExist,
    flowSaveResponse,
    flowAccept,
    flowRetryOrNot,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};
main();
