import psycopg2

conn = psycopg2.connect(host="localhost",dbname="postgres", user="postgres", password="pass123")
cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS person(
            id INT ,
            name VARCHAR(255),
            age INT,
            gender CHAR);
            
            """)


conn.commit()



cur.close()
conn.close()
