-- ==========================================
-- INSERT ROLES
-- ==========================================

INSERT INTO roles (role_name)
VALUES
('Admin'),
('Student'),
('Super Admin');


-- ==========================================
-- INSERT USERS
-- ==========================================

INSERT INTO users
(username, email, password, role_id)
VALUES
(
'admin',
'admin@ahgib.com',
'123$567$',
1
),

(
'G_test',
'leangmong4@gmail.com',
'123$456$',
2
),

(
'superadmin',
'superadmin@ahgib.com',
'123$567$',
3
);


-- ==========================================
-- INSERT QUESTIONS
-- ==========================================

INSERT INTO questions
(question_text, question_type, subject, admin_create_by)

VALUES

(
'Do you enjoy solving mathematics problems?',
'interest',
'Math',
6
),

(
'Do you like programming and technology?',
'interest',
'IT',
6
),

(
'Do you enjoy scientific experiments?',
'interest',
'Science',
6
),

(
'Do you like managing business activities?',
'interest',
'Business',
6
);

-- ==========================================
-- INSERT CAREERS
-- ==========================================

INSERT INTO careers
(careers_name, description)

VALUES

(
'Software Engineer',
'Develop software applications and systems.'
),

(
'Data Scientist',
'Analyze data and build AI models.'
),

(
'Business Analyst',
'Analyze business requirements and processes.'
);

-- ==========================================
-- INSERT CAREER SKILLS
-- ==========================================

INSERT INTO career_skill
(careers_id, skill_name)

VALUES

(1,'Programming'),

(1,'Problem Solving'),

(2,'Python'),

(2,'Machine Learning'),

(3,'Communication');

-- ==========================================
-- INSERT MAJORS
-- ==========================================

INSERT INTO major
(major_name, field_of_study)

VALUES

(
'Computer Science',
'Information Technology'
),

(
'Data Science',
'Information Technology'
),

(
'Business Administration',
'Business'
);

-- ==========================================
-- INSERT UNIVERSITIES
-- ==========================================

INSERT INTO universities
(name, location, website)

VALUES

(
'Cambodia Academy of Digital Technology',
'Phnom Penh',
'https://www.cadt.edu.kh'
),

(
'Institute of Technology of Cambodia',
'Phnom Penh',
'https://itc.edu.kh'
),

(
'Royal University of Phnom Penh',
'Phnom Penh',
'https://rupp.edu.kh'
);

-- ==========================================
-- INSERT UNIVERSITY MAJOR
-- ==========================================

INSERT INTO uni_major
(university_id, major_id, tuition_fee)

VALUES

(1,1,1200.00),

(1,2,1500.00),

(2,1,1000.00),

(3,3,900.00);

-- ==========================================
-- INSERT ASSESSMENTS
-- ==========================================

INSERT INTO assessments
(user_id, status)

VALUES

(2,'completed');

-- ==========================================
-- INSERT ANSWERS
-- ==========================================

INSERT INTO answer
(
ass_id,
question_id,
answer_text,
answer_value
)

VALUES

(
1,
1,
'I enjoy mathematics',
5
),

(
1,
2,
'I love programming',
5
),

(
1,
3,
'I like science',
4
);

-- ==========================================
-- INSERT SCORES
-- ==========================================

INSERT INTO score
(
ass_id,
subject,
score_value
)

VALUES

(1,'Math',90),

(1,'IT',95),

(1,'Science',85);

-- ==========================================
-- INSERT AI REPORT
-- ==========================================

INSERT INTO ai_report
(
ass_id,
career_analysis
)

VALUES

(
1,
'Student shows strong ability in programming and mathematics. Recommended career: Software Engineer.'
);

-- ==========================================
-- INSERT RECOMMENDATION
-- ==========================================

INSERT INTO recommended
(
report_id,
major_id,
university_id
)

VALUES

(
1,
1,
1
),

(
1,
2,
1
);

-- ==========================================
-- INSERT ACTIVITY LOGS
-- ==========================================

INSERT INTO activity_logs
(
action,
message,
user_id
)

VALUES

(
'user_register',
'New student student01 registered',
2
),

(
'role_update',
'Super Admin changed user role',
3
),

(
'user_login',
'Admin logged into system',
1
);