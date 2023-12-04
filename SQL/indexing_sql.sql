-- create index on a table 

CREATE INDEX empl_idx
ON employee(id)

-- this will create a empl_idx column in table employee by using id column.

-- this will cretae a defauilt indext of B-tree type ( balanced tree )

-- types of indexes
-- 1) B-Tree
-- 2) Function based ( area to use ) => when there is any operation on the column on which b-tree index is created then indexing have no effexct on it becuse we are querring it on the based of result coming from that columns data.
-- 3) Clustured Index
-- 4) Bitmap Index (on oracle)
-- 5) Fulltext Index

-- Example for cons of b-tree and use of function 
SELECT empl_name, anual_salary/12 AS monthly_salary FROM employee
WHERE anual_salary/12 > 10000

-- in the above example we arer deviding the anual; sal by 12 so creating B-Tree index based on anual salary if of no use.

-- we can crete function based index like below
CREATE INDEX empl_monthly_salary_idx
ON employee(anual_salary/12)