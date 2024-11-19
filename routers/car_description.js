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

// QUERY [GET all cars per car category]

router.get('/api/car_description/:car_description_id', async (req, res) => {                   // localhost:5000/api/car_description/1 [GET]
    try{
        const {car_description_id} = req.params.car_description_id;
        const [data] = await connection.promise().query(
            `SELECT * from car_description where car_description_id=?;`, [car_description_id]
        );
        console.log("description data", data)
        res.status(200).json({ // 200 -> indicates sucessfull request
            message: "Successfully grabbed description for car",
            description: data
        })

    } catch (err) {
        res.status(500).json({
            message: err || "Error getting description"
        });
    }
});

// POST (insert description into car)                                       
router.post('/', async (req, res) => {                                      // localhost:5000/car_description/1 [POST]
    try{
        console.log(JSON.stringify(req.body));
        const {car_id} = req.params;
        const {make_model, price, mpg, color} = req.body;
        const [data] = await connection.promise().query(
            `INSERT INTO car_description (make_model, price, mpg, color, car_id) VALUES =(?,?,?,?,?);`, [make_model, price, mpg, color, car_id]
        );
        res.status(202).json({ 
            message: "Successfully inserted description into car",
            description: data
        });
    } catch (err) {
        res.status(500).json({
            message: err || "Error adding description"
        });
    }
});

// DELETE (delete description from car)
router.delete("/", async (req, res) => {                                    // localhost:5000/car_description/1 [DELETE]
    try {
        const {car_id} = req.params;
        const {make_model, price, mpg, color} = req.body;
        const [data] = await connection.promise().query(
            `DELETE FROM car_description (make_model, price, mpg, color, car_id) WHERE VALUES =(?,?,?,?,?);`, [make_model, price, mpg, color, car_id]
        );
        res.status(202).json({  // res.send(data)
          employees: data[0]
        });
      } catch (err) {
        res.status(500).json({
          message: err
        });
      }
  });

export default router;