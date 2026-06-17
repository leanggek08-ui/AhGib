require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;

        // check if user exists
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        const newUser = await pool.query(
        "INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role_id",
        [username, email, hashedPassword, role_id]
    );

        res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0]
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        // Check password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role_id: user.role_id
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role_id: user.role_id
            }
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/profile", verifyToken, async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT user_id, username, email, role_id FROM users WHERE user_id = $1",
            [req.user.user_id]
        );

        res.json(result.rows[0]);

    } catch (err) {

        res.status(500).send(err.message);

    }

});

module.exports = router;