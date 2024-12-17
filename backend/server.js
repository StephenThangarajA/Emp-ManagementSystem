const express = require("express");
const morgan = require("morgan");
const mysqlpool = require("./config/db");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();
app.use(cors())
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/v1/employeemanagement',require("./routes/employeeroute"));
app.get("/test",(req,res)=>{
    res.status(200).send("This is backend for frontend project");
});

const port = process.env.port || 8000;
mysqlpool.query('SELECT 1').then(()=>{
    console.log("database connected successfully");

    app.listen(port,()=>{
        console.log("server running at port:"+port);
    });

})