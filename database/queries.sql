-- ==========================================
-- AhGib Database Meaningful Queries
-- PostgreSQL
-- ==========================================

-- 1. Display all users with their role names

SELECT
    u.user_id,
    u.username,
    u.email,
    r.role_name
FROM users u
JOIN roles r
ON u.role_id = r.role_id;  -- sucess

-- 2. Count users by role

SELECT
    r.role_name,
    COUNT(u.user_id) AS total_users
FROM roles r
LEFT JOIN users u
ON r.role_id = u.role_id
GROUP BY r.role_name; -- sucess 


-- 3. Display questions and creator

SELECT
    q.question_id,
    q.question_text,
    q.subject,
    u.username AS created_by
FROM questions q
JOIN users u
ON q.admin_create_by = u.user_id; -- sucess 

-- 4. Display student assessment history

SELECT
    a.ass_id,
    u.username,
    u.email,
    a.status,
    a.time_create
FROM assessments a
JOIN users u
ON a.user_id = u.user_id
ORDER BY a.time_create DESC; -- sucess 


-- 5. Count assessments by status

SELECT
    status,
    COUNT(*) AS total_assessments
FROM assessments
GROUP BY status; -- sucess 

-- 6. Display student scores

SELECT
    u.username,
    s.subject,
    s.score_value
FROM score s
JOIN assessments a
ON s.ass_id = a.ass_id
JOIN users u
ON a.user_id = u.user_id
ORDER BY u.username; -- sucess

-- 7. Average score by subject

SELECT
    subject,
    AVG(score_value) AS average_score
FROM score
GROUP BY subject; -- sucuess 


-- 8. Students with average score above 80

SELECT
    u.username,
    AVG(s.score_value) AS average_score
FROM users u
JOIN assessments a
ON u.user_id = a.user_id
JOIN score s
ON a.ass_id = s.ass_id
GROUP BY u.username
HAVING AVG(s.score_value) > 80; -- sucess 

-- 9. Display AI reports with student information

SELECT
    ar.report_id,
    u.username,
    ar.date_generate,
    ar.career_analysis
FROM ai_report ar
JOIN assessments a
ON ar.ass_id = a.ass_id
JOIN users u
ON a.user_id = u.user_id
ORDER BY ar.date_generate DESC; -- sucess 

-- 10. Display recommended universities and majors

SELECT
    u.username,
    m.major_name,
    uni.name AS university_name,
    uni.location
FROM recommended r
JOIN ai_report ar
ON r.report_id = ar.report_id
JOIN assessments a
ON ar.ass_id = a.ass_id
JOIN users u
ON a.user_id = u.user_id
JOIN major m
ON r.major_id = m.major_id
JOIN universities uni
ON r.university_id = uni.university_id; -- sucess 

-- 11. Display university major information

SELECT
    uni.name AS university,
    m.major_name,
    um.tuition_fee
FROM uni_major um
JOIN universities uni
ON um.university_id = uni.university_id
JOIN major m
ON um.major_id = m.major_id
ORDER BY uni.name; -- suncess 


-- 12. Display recent system activities

SELECT
    al.id,
    al.action,
    al.message,
    u.username,
    al.created_at
FROM activity_logs al
LEFT JOIN users u
ON al.user_id = u.user_id
ORDER BY al.created_at DESC
LIMIT 20; --  sucess 