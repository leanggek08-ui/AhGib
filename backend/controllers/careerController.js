import pool from "../db/db.js";
import { logActivity } from "../utils/activityLogger.js";


// Get all careers
export async function getAllCareers(req,res){

    try{

        const result = await pool.query(
            "SELECT * FROM careers ORDER BY careers_id ASC"
        );

        res.json(result.rows);

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}



// Create career
export async function createCareer(req,res){

    try{

        const {
            careers_name,
            description
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO careers
            (careers_name,description)
            VALUES($1,$2)
            RETURNING *
            `,
            [
                careers_name,
                description
            ]
        );


        await logActivity(
            "career_create",
            `Career ${careers_name} created`,
            req.user.user_id
        );


        res.json(result.rows[0]);


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}



// Update career
export async function updateCareer(req,res){

    try{

        const {id}=req.params;

        const {
            careers_name,
            description
        }=req.body;



        const result = await pool.query(
            `
            UPDATE careers
            SET careers_name=$1,
                description=$2
            WHERE careers_id=$3
            RETURNING *
            `,
            [
                careers_name,
                description,
                id
            ]
        );



        await logActivity(
            "career_update",
            `Career ${careers_name} updated`,
            req.user.user_id
        );



        res.json(result.rows[0]);


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}



// Delete career
export async function deleteCareer(req,res){

    try{

        const {id}=req.params;


        await pool.query(
            "DELETE FROM careers WHERE careers_id=$1",
            [id]
        );



        await logActivity(
            "career_delete",
            `Career ID ${id} deleted`,
            req.user.user_id
        );



        res.json({
            message:"Career deleted successfully"
        });


    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}