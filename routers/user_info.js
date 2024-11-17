import express from 'express';
import mysql from 'mysql2'
import bcrypt from 'bcrypt'; 

const router = express.Router()
// connecting Database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "rays_prestige_motors"
});  

// POST -> check username existence in database
router.post("/check_username", async (req, res) => {        // localhost:5000/user_info/check_username [POST]
    console.log("check username called")
    try{ 
        const {username} = req.body;
        const [data] = await connection.promise().query(
            `select * from user_info where username = ?;`, [username]
        );

        if (data.length === 0){
            return res.status(200).json({
                message: "Username not already in use"
            });
        }
        else{
            return res.status(409).json({
                message: "Username already in use"
            });
        }

    } catch (err) {
        console.log("An error occurred while checking username:", err)
        res.status(500).json({
            message: err || "Error occurred while checking username"
        });
    }
});



// POST -> creating a new user
router.post("/register", async (req, res) => {              // localhost:5000/user_info/register [POST]
    try{ 
        const {username, password} = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const data = await connection.promise().query(
            `INSERT INTO user_info (username, password) VALUES (?, ?);`, [username, passwordHash]
        );
        res.status(201).json({
            message: "Successfully registered user",
            affectedRows: data.affectedRows,
            insertID: data.insertID
        });

    } catch (err) {
        console.log("An error occurred during registration:", err)
        res.status(500).json({
            message: err || "Error occurred while registering user"
        });
    }
});

// POST -> log in user verification
router.post("/login", async (req, res) => {                 // localhost:5000/user_info/login [POST]
    try{
        const {username} = req.body;
        const [data] = await connection.promise().query(
            `select * from user_info where username = ?;`, [username]
        );

        // checking if the entered user exists
        if (data.length === 0){
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        
        const user = data[0];
/*
        const matched = await bcrypt.compare(password, user.password);

        if (!matched){
            return res.status(401).json({
                message: "Invalid username or password"
            });
        } 
*/
        res.status(200).json({ // 200 -> correct login
            message: "Login successful",
            username: user.username
        })

    } catch (err) {
        console.log("Error occured during login:", err)
        res.status(500).json({
            message: err || "Error occured while logging in"
        });
    }
});

export default router;