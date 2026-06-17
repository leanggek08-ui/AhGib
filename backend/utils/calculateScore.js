figi const pool = require("../db/db");

async function calculateScore(ass_id) {
    try {
        // 1. Get all answers for this assessment
        const answersResult = await pool.query(
            "SELECT * FROM answer WHERE ass_id = $1",
            [ass_id]
        );

        const answers = answersResult.rows;

        // 2. Group scores by subject
        const subjectMap = {};

        for (let ans of answers) {
            const questionResult = await pool.query(
                "SELECT subject FROM questions WHERE question_id = $1",
                [ans.question_id]
            );

            const subject = questionResult.rows[0].subject;

            if (!subjectMap[subject]) {
                subjectMap[subject] = 0;
            }

            subjectMap[subject] += ans.answer_value;
        }

        // 3. Insert into score table
        for (let subject in subjectMap) {
            await pool.query(
                `INSERT INTO score (ass_id, subject, score_value)
                 VALUES ($1, $2, $3)`,
                [ass_id, subject, subjectMap[subject]]
            );
        }

        return subjectMap;

    } catch (err) {
        console.error(err);
    }
}

module.exports = calculateScore;