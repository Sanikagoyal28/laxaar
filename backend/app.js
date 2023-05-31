const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require('./middleware/errorHandler')
const router = require('./routes/noteRoutes')
const cors = require("cors")

require('dotenv').config();

const app = express();

app.use(express.json())

//connection with database
mongoose.connect(process.env.URI)
    .then((res) => {
        app.listen(process.env.port)
        console.log(`App is running at ${process.env.port} and Database connected`)
    })
    .catch((err) => {
        console.log(err)
    })

app.use(cors({ origin: true }))
app.use(router)
app.use(errorHandler)
