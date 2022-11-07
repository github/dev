from telethon import TelegramClient, events, Button

import aiosqlite
import os


bd = sqlite3.connect("utils/main.db")
cursor = db.cursor()

async def startup(client):
    await os.system("cls")
    if check():
        await client.send_message("Bot startato", read_cfg("telegram", "owner_id"))
    else: console.print("[red blink] [ERROR [not blink] IL bot non riesce a startarsi")


client = TelegramClient("botnetflix.session", read_cfg("telegram", bot_token), read_cfg("telegram", bot_token)).start(bot_token = read_cfg("telegram", bot_token))


@client.on(events.NewMessage(pattern = "/start"))
async def start(event):
    if await add_to_db(cursor, db, event):
        


    else:
        # if an user is alr in the db



client.loop.run_until_complete(startup(client))
client.run_until_disconnected()