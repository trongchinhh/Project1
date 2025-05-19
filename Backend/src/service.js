const express = require('express')
require('dotenv').config()
const configViewEngine = require('./config/configViewEngine')
const webRoute = require('./routes/web')
const apiRoute = require('./routes/api')
const cors = require("cors");
const connection = require('./config/connectDB')
const cookieParser = require('cookie-parser');

const app = express()
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}))

const port = process.env.PORT
//config templateEngine
configViewEngine(app);

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


//test connectDB
connection()

//config route
app.use('/', webRoute)
app.use('/api', apiRoute)



// A simple SELECT query




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})