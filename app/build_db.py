import sqlite3

DB_FILE="data.db"
db = sqlite3.connect(DB_FILE)
c = db.cursor()

c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY 
    )"""
)
db.commit()
db.close()
