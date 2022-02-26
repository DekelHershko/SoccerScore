const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
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

app.listen(3000, () => {
    console.log('Soccer Score server listening on port 3000')
})