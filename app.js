const express = require('express')
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoutes')
const categoryRoute = require('./routes/categoryRoutes')

const app = express()

// Connet DB
mongoose.connect('mongodb://localhost/smartedu-db')
.then(() => {
    console.log("DB Connected Successfuly")
})


//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.static("public"))
// Bu middleware'ler olmadan create formu çalışamaz
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/categories", categoryRoute)

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})