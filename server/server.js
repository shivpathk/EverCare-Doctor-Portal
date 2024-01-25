const express = require('express')
var cors = require('cors');
const app = express();
require('dotenv').config();
const dbconfig = require("./config/dbConfig.js")



app.use(express.json())
app.use(cors());

const userRoute = require("./routes/UserRoute.js")
const adminRoute = require("./routes/AdminRoute.js")
const doctorRoute = require("./routes/DoctorRoute.js")


app.use('api/user' , userRoute)
app.use('api/admin' , adminRoute)
app.use('api/doctor' , doctorRoute)

const port = process.env.PORT || 5000;

app.listen(port , ()=>{
    console.log("Listening to the port ",port)
})