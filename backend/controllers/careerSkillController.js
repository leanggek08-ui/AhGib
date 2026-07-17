import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";


// Get all career skills
export async function getAllCareerSkills(req,res){

    try{

        const result = await pool.query(`
            SELECT
                cs.car_skill_id,
                cs.careers_id,
                c.careers_name,
                cs.skill_name

            FROM career_skill cs

            JOIN careers c
            ON cs.careers_id = c.careers_id

            ORDER BY c.careers_name
        `);


        res.json(result.rows);


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}



// Create skill
export async function createCareerSkill(req,res){

    try{

        const {
            careers_id,
            skill_name
        } = req.body;



        const result = await pool.query(
            `
            INSERT INTO career_skill
            (
                careers_id,
                skill_name
            )

            VALUES
            ($1,$2)

            RETURNING *
            `,
            [
                careers_id,
                skill_name
            ]
        );



        await logActivity(
            "career_skill_create",
            `Skill ${skill_name} added`,
            req.user.user_id
        );



        res.json(result.rows[0]);


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}




// Update skill
export async function updateCareerSkill(req,res){

    try{

        const {id}=req.params;


        const {
            careers_id,
            skill_name
        }=req.body;



        const result = await pool.query(
            `
            UPDATE career_skill

            SET
            careers_id=$1,
            skill_name=$2

            WHERE car_skill_id=$3

            RETURNING *
            `,
            [
                careers_id,
                skill_name,
                id
            ]
        );



        await logActivity(
            "career_skill_update",
            `Skill updated`,
            req.user.user_id
        );



        res.json(result.rows[0]);


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}




// Delete skill
export async function deleteCareerSkill(req,res){

    try{

        const {id}=req.params;



        await pool.query(
            `
            DELETE FROM career_skill

            WHERE car_skill_id=$1
            `,
            [id]
        );



        await logActivity(
            "career_skill_delete",
            `Skill deleted`,
            req.user.user_id
        );



        res.json({
            message:"Skill deleted successfully"
        });


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}
