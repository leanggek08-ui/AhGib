import  pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register 
export async function register(req,res){
    try{
        const{username,email,password,role_id} = req.body;
        const hash = await bcrypt.hash(password,10);
        const result = await pool.query( `INSERT INTO users (username, email, password, role_id)
             VALUES ($1,$2,$3,$4)
             RETURNING user_id, username, email, role_id`,
            [username, email, hash, role_id || 2]);
        res.json({ message: "User registered successfully", user: result.rows[0]})

    }catch(err){
        res.status(500).json({error: err.message });
    }
}

// Login 
export async function login(req,res){
    try{
        const {email,password} = req.body;
        const user = await pool.query( "SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const valid = await bcrypt.compare(password, user.rows[0].password);

        if (!valid) {
            return res.status(401).json({ message: "Invalid password" });
        }
         const token = jwt.sign(
            {
                user_id: user.rows[0].user_id,
                role_id: user.rows[0].role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                user_id: user.rows[0].user_id,
                username: user.rows[0].username,
                role_id: user.rows[0].role_id
            }
        });


    }catch(err){
        res.status(500).json({ error: err.message });

    }
}

// forget password
export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // create simple token (for school project)
        const token = Math.random().toString(36).substring(2);

        await pool.query(
            `UPDATE users
             SET reset_token = $1,
                 reset_expires = NOW() + INTERVAL '15 minutes'
             WHERE email = $2`,
            [token, email]
        );

        res.json({
            message: "Reset token generated",
            reset_token: token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// reset password
export async function resetPassword(req, res) {
    try {
        const { token, new_password } = req.body;

        const user = await pool.query(
            `SELECT * FROM users
             WHERE reset_token = $1
             AND reset_expires > NOW()`,
            [token]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hash = await bcrypt.hash(new_password, 10);

        await pool.query(
            `UPDATE users
             SET password = $1,
                 reset_token = NULL,
                 reset_expires = NULL
             WHERE reset_token = $2`,
            [hash, token]
        );

        res.json({
            message: "Password reset successful"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}