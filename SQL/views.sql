-- Views are cretes from a table to hide sensitive and unauthorized contect of the table
-- we igth have complex tables joind togeter and have new result as simple queries

-- let say you have a table called employee
-- it contain columns like ( empl_id, empl_name, empl_frist_name, empl_last_name, empl_dob, empl_salary etc..)

-- now when an employee is quering the data we want that salay and dob should not be visible to them for that we can views in sql like below


CREATE VIEW empl_public AS
SELECT empl_id, empl_name, empl_frist_name, empl_last_name
FROM employee

-- now we have new table called empl_public which contain only selected columns we can have regular operations on it.