import express from 'express';
import cors from 'cors';

import userInfo from './routers/user_info.js';
import carCategories from './routers/car_categories.js';
import carDescription from './routers/car_description.js';

// Importing required modules and routers
const app = express();
app.use(express.json());
app.use(cors());
app.use("/car_categories", carCategories);         // localhost:5000/car_categories
app.use("/user_info", userInfo);                   // localhost:5000/user_info
app.use("/car_description", carDescription);       // localhost:5000/car_description

app.get('/', (req, res) => {                           // localhost:5000
    res.send("Login Page");
});

app.listen(5000, ()=> {
    console.log('listening at port 5000');
});