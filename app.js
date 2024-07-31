const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoutes')
const categoryRoute = require('./routes/categoryRoutes')
const userRoute = require('./routes/userRoute')

const app = express()

// Connet DB
mongoose.connect('mongodb://localhost/smartedu-db')
.then(() => {
    console.log("DB Connected Successfuly")
})


//Template Engine
app.set("view engine", "ejs")

// Global Variable
global.userIN = null


//Middlewares

app.use(express.static("public"))
// Bu middleware'ler olmadan create formu çalışamaz
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl:'mongodb://localhost/smartedu-db' })
}))
app.use(flash());
app.use((req, res, next)=> {
    res.locals.flashMessages = req.flash();
    next();
  })

// Routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID
    next()
})
app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/categories", categoryRoute)
app.use("/users", userRoute)

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})