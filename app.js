const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')

const teamsRouter = require('./routes/teams')
const commentsRouter = require('./routes/comments')

const app = express()

mongoose.connect('mongodb://localhost:27017/soccer-score')
    .then(() => console.log('Connection established to soccer-score db'))
    .catch((e) => console.log(`Error while trying to connect to soccer-score db ${e}`))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/teams', teamsRouter)
app.use('/teams/:id/comments', commentsRouter)

app.get('/', (req, res) => {
    res.render('home')
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message)
        err.message = "Oops, something went wrong!"
    res.status(statusCode).send(err.message)
})

app.all('*', (req, res) => {
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Soccer Score server listening on port 3000')
})