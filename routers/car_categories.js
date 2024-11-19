import express from 'express';
import mysql from 'mysql2'

const router = express.Router()
// connecting Database
const connection = mysql.createPool({   
    host: "localhost",
    user: "root",
    password: "root",
    database: "rays_prestige_motors"
});  

// GET all car categories

router.get('/api/car-categories', async (req, res) => {                       // localhost:5000/api/car_categories [GET]
    try{
        const [data] = await connection.promise().query(
            `SELECT * FROM car_categories;`
        );
        res.status(200).json({
            message: "Successfully acquired cars",
            cars: data
        })

    } catch (err) {
        res.status(500).json({
            message: err || "Error getting cars"
        });
    }
});

// POST insert all car categories
router.post("/", async (req, res) => {                      // localhost:5000/car_categories/ [POST]
    try{
        const{car_type} = req.body;
        const data = await connection.promise().query(
            `insert into car_categories (car_type) values (?);`, [car_type]
        );
        res.status(200).json({ 
            message: "Successfully inserted car categories",
            cars: data
        });
    } catch (err) {
        res.status(500).json({
            message: err || "Error adding car categories"
        });
    }
});


export default router;