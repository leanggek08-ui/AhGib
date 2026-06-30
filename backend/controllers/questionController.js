import pool from "../db/db.js";

// create question 
export async function createQuestion(req,res) {
    try{
        const {question_text,question_type,subject,admin_create_by} = req.body;
        const result = await pool.query( `INSERT INTO questions
            (question_text, question_type, subject, admin_create_by)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,[question_text,question_type,subject,admin_create_by]);
        res.json(result.rows[0]);


    }catch(err){
        res.status(500).json({error:err.message});

    }
}

// Get all question 
export async function getQuestions(req, res) {
    try {
        const result = await pool.query(
            "SELECT * FROM questions ORDER BY question_id ASC"
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get by id
export async function getQuestionById(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM questions WHERE question_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}