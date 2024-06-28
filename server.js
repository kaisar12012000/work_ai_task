/*
GET – list user (done)
GET - /worko/user/:userId - get user details (done)
POST -  create user (done)
PUT - update user  (done)
PATCH - update user (done)
DELETE - soft delete user in DB (done)
 */
require("dotenv").config()
const express = require("express")
const mongoose  = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/routes")

mongoose.connect(process.env.DB_CONNECTION_URI, {useUnifiedTopology: true})
        .then(result => {
            console.log("Database online - Connection Successful. \nMongoDB Connected...")
            app.listen(process.env.PORT)
            console.log("Server started!\nListening to PORT=3002...")
        })
        .catch(e => {
            console.log("Connection Failed!\nCould not connect to MongoDB.\n", e)
        })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())

app.use(authRoutes)