
-- https://www.hackerrank.com/challenges/the-report/problem?isFullScreen=true

SELECT 
CASE WHEN S.Marks < 70 THEN NULL
    ELSE S.Name
    END
, G.Grade, S.Marks
FROM Students AS S
CROSS JOIN Grades AS G
WHERE S.marks BETWEEN G.min_mark AND G.max_mark
ORDER BY G.grade DESC,S.name ASC