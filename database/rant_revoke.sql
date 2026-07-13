-- ==========================================
-- CREATE DATABASE USERS
-- ==========================================


CREATE USER ahgib_admin
WITH PASSWORD 'AdminPassword123';


CREATE USER ahgib_student
WITH PASSWORD 'StudentPassword123';


CREATE USER ahgib_readonly
WITH PASSWORD 'ReadOnlyPassword123';


-- ==========================================
-- ADMIN PRIVILEGES
-- ==========================================


GRANT CONNECT
ON DATABASE ahgib
TO ahgib_admin;


GRANT USAGE
ON SCHEMA public
TO ahgib_admin;


GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO ahgib_admin;


GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO ahgib_admin;


-- ==========================================
-- STUDENT PRIVILEGES
-- ==========================================


GRANT CONNECT
ON DATABASE ahgib
TO ahgib_student;


GRANT USAGE
ON SCHEMA public
TO ahgib_student;


GRANT SELECT
ON questions
TO ahgib_student;


GRANT SELECT, INSERT
ON assessments
TO ahgib_student;


GRANT SELECT, INSERT
ON answer
TO ahgib_student;


GRANT SELECT
ON careers, major, universities
TO ahgib_student;

-- ==========================================
-- READ ONLY USER
-- ==========================================


GRANT CONNECT
ON DATABASE ahgib
TO ahgib_readonly;


GRANT USAGE
ON SCHEMA public
TO ahgib_readonly;


GRANT SELECT
ON ALL TABLES IN SCHEMA public
TO ahgib_readonly;