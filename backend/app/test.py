import sqlite3

# Connect to the election.db SQLite database
connection = sqlite3.connect('election.db')
cursor = connection.cursor()

# List all tables in the database
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables:", tables)

# Query data from the Election table
cursor.execute("SELECT * FROM Election;")
rows = cursor.fetchall()
for row in rows:
    print(row)

# Close the connection
connection.close()
