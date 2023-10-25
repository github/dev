CREATE VIEW people_on_mars AS
SELECT CONCAT('M', martian_id) AS id, first_name, last_name, 'Martian' AS [status]
FROM martian
UNION
SELECT CONCAT('V', visitor_id) AS id, first_name, last_name, 'Visitor' AS [status]
FROM visitors

-- this will create new people_on_mars table which contain mars people from martian tabel abd visitors from visitors table and theirs status 

-- Note : the status column is in  square bracket because it is also a keyword in sql.

-- we are uniting the bale with union command which is different form joins in sql