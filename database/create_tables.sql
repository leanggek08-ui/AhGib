-- ==========================================
-- AhGib Database
-- CREATE TABLE SCRIPT
-- PostgreSQL / Supabase
-- ==========================================

-- ==========================================
-- 1. ROLES TABLE
-- ==========================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- ==========================================
-- 2. USERS TABLE
-- ==========================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    username VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password TEXT NOT NULL,

    role_id INTEGER NOT NULL,

    reset_token TEXT,

    reset_expires TIMESTAMP,


    CONSTRAINT fk_user_role
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
    ON DELETE SET NULL
);


-- ==========================================
-- 3. QUESTIONS TABLE
-- ==========================================

CREATE TABLE questions (

    question_id SERIAL PRIMARY KEY,

    question_text TEXT NOT NULL,

    question_type VARCHAR(50),

    subject VARCHAR(50) NOT NULL,

    admin_create_by INTEGER NOT NULL,


    CONSTRAINT fk_question_creator

    FOREIGN KEY(admin_create_by)

    REFERENCES users(user_id)

    ON DELETE CASCADE,


    CONSTRAINT check_subject

    CHECK (
        subject IN
        (
        'Math',
        'IT',
        'Science',
        'Business',
        'Language'
        )
    )
);

-- ==========================================
-- 4. ASSESSMENTS TABLE
-- ==========================================

CREATE TABLE assessments (

    ass_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    status VARCHAR(50)
    DEFAULT 'in_progress',

    time_create TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_assessment_user

    FOREIGN KEY(user_id)

    REFERENCES users(user_id)

    ON DELETE CASCADE
);

-- ==========================================
-- 5. ANSWER TABLE
-- ==========================================

CREATE TABLE answer (

    answer_id SERIAL PRIMARY KEY,

    ass_id INTEGER NOT NULL,

    question_id INTEGER NOT NULL,

    answer_text TEXT,

    answer_value INTEGER,


    CONSTRAINT fk_answer_assessment

    FOREIGN KEY(ass_id)

    REFERENCES assessments(ass_id)

    ON DELETE CASCADE,


    CONSTRAINT fk_answer_question

    FOREIGN KEY(question_id)

    REFERENCES questions(question_id)

    ON DELETE CASCADE,


    CONSTRAINT unique_ass_question

    UNIQUE(ass_id, question_id)
);

-- ==========================================
-- 6. SCORE TABLE
-- ==========================================

CREATE TABLE score (

    score_id SERIAL PRIMARY KEY,

    ass_id INTEGER NOT NULL,

    subject VARCHAR(50) NOT NULL,

    score_value INTEGER DEFAULT 0,


    CONSTRAINT fk_score_assessment

    FOREIGN KEY(ass_id)

    REFERENCES assessments(ass_id)

    ON DELETE CASCADE,


    CONSTRAINT unique_ass_subject

    UNIQUE(ass_id, subject)
);

-- ==========================================
-- 7. CAREERS TABLE
-- ==========================================

CREATE TABLE careers (

    careers_id SERIAL PRIMARY KEY,

    careers_name VARCHAR(150) NOT NULL,

    description TEXT
);



-- ==========================================
-- 8. CAREER SKILL TABLE
-- ==========================================

CREATE TABLE career_skill (

    car_skill_id SERIAL PRIMARY KEY,

    careers_id INTEGER NOT NULL,

    skill_name VARCHAR(150) NOT NULL,


    CONSTRAINT fk_career_skill

    FOREIGN KEY(careers_id)

    REFERENCES careers(careers_id)

    ON DELETE CASCADE
);



-- ==========================================
-- 9. MAJOR TABLE
-- ==========================================

CREATE TABLE major (

    major_id SERIAL PRIMARY KEY,

    major_name VARCHAR(100) NOT NULL,

    field_of_study VARCHAR(100)
);



-- ==========================================
-- 10. UNIVERSITIES TABLE
-- ==========================================

CREATE TABLE universities (

    university_id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    location VARCHAR(150),

    website TEXT
);



-- ==========================================
-- 11. UNIVERSITY - MAJOR TABLE
-- MANY TO MANY RELATIONSHIP
-- ==========================================

CREATE TABLE uni_major (

    uni_major_id SERIAL PRIMARY KEY,

    university_id INTEGER NOT NULL,

    major_id INTEGER NOT NULL,

    tuition_fee NUMERIC(10,2),


    CONSTRAINT fk_uni_major_university

    FOREIGN KEY(university_id)

    REFERENCES universities(university_id)

    ON DELETE CASCADE,


    CONSTRAINT fk_uni_major_major

    FOREIGN KEY(major_id)

    REFERENCES major(major_id)

    ON DELETE CASCADE
);



-- ==========================================
-- 12. AI REPORT TABLE
-- ==========================================

CREATE TABLE ai_report (

    report_id SERIAL PRIMARY KEY,

    ass_id INTEGER NOT NULL,

    date_generate TIMESTAMP

    DEFAULT CURRENT_TIMESTAMP,

    career_analysis TEXT,


    CONSTRAINT fk_report_assessment

    FOREIGN KEY(ass_id)

    REFERENCES assessments(ass_id)

    ON DELETE CASCADE
);



-- ==========================================
-- 13. RECOMMENDED TABLE
-- CONNECT AI REPORT WITH MAJOR AND UNIVERSITY
-- ==========================================

CREATE TABLE recommended (

    recommended_id SERIAL PRIMARY KEY,

    report_id INTEGER NOT NULL,

    major_id INTEGER NOT NULL,

    university_id INTEGER NOT NULL,


    CONSTRAINT fk_recommended_report

    FOREIGN KEY(report_id)

    REFERENCES ai_report(report_id)

    ON DELETE CASCADE,


    CONSTRAINT fk_recommended_major

    FOREIGN KEY(major_id)

    REFERENCES major(major_id)

    ON DELETE CASCADE,


    CONSTRAINT fk_recommended_university

    FOREIGN KEY(university_id)

    REFERENCES universities(university_id)

    ON DELETE CASCADE
);



-- ==========================================
-- 14. ACTIVITY LOGS TABLE
-- ==========================================

CREATE TABLE activity_logs (

    id SERIAL PRIMARY KEY,

    action TEXT NOT NULL,

    message TEXT NOT NULL,

    user_id INTEGER,

    created_at TIMESTAMP

    DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_activity_user

    FOREIGN KEY(user_id)

    REFERENCES users(user_id)

    ON DELETE SET NULL
);