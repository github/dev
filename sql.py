import aiosqlite


async def add_to_db(cursor, db, event):
    async with aiosqlite.connect() as db:
        usr = await db.execute("SELECT count(*) FROM users WHERE user_id = ?", (event.user_id, )).fetchone()[0]
        if int(usr) > 0: 
            db.execute(f"INSERT INTO users ('id,') VALUES ('')")
