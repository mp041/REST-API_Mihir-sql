const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.send("Hello World!!!");
})

// imported from routes
const employeeRoutes = require('./src/routes/employee.route');

app.use('/employee',employeeRoutes);


app.listen(port,()=>{
    console.log(`Server is Running on port : ${port}`);
})