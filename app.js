const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const { teamValidateSchema, commentValidateSchema } = require('./schemas.js')
const Team = require('./models/team')
const Comment = require('./models/comment')
const Schema = mongoose.Schema


const app = express()

mongoose.connect('mongodb://localhost:27017/soccer-score')
    .then(() => console.log('Connection established to soccer-score db'))
    .catch((e) => console.log(`Error while trying to connect to soccer-score db ${e}`))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const validateTeam = (req, res, next) => {
    const { error } = teamValidateSchema.validate(req.body)
    if (error) {
        const message = error.details.map(e => e.message).join(', ')
        throw new Error(message)
    }
    else {
        next()
    }
}

const validateComment = (req, res, next) => {
    const { error } = commentValidateSchema.validate(req.body)
    if (error) {
        const message = error.details.map(e => e.message).join(', ')
        throw new Error(message)
    }
    else {
        next()
    }
}

const getDate = () => {
    // current timestamp in milliseconds
    const ts = Date.now();

    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();

    // prints date & time in YYYY-MM-DD format
    return (year + "-" + month + "-" + date);
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/teams', async (req, res) => {
    const allTeams = await Team.find({})
    res.render('teams/index', { allTeams })
})

app.post('/teams', validateTeam, async (req, res) => {
    const newTeam = new Team(req.body.team)
    newTeam.save()
    res.redirect(`teams/${newTeam._id}`)
})

app.get('/teams/new', (req, res) => {
    res.render('teams/new')
})

app.get('/teams/:id', async (req, res) => {
    const team = await Team.findById(req.params.id).populate('comments')
    res.render('teams/show', { team })
})

app.get('/teams/:id/edit', async (req, res) => {
    const team = await Team.findById(req.params.id)
    res.render('teams/edit', { team })
})

app.put('/teams/:id/', validateTeam, async (req, res) => {
    await Team.findByIdAndUpdate(req.params.id, { ...req.body.team })
    res.redirect(`${req.params.id}`)
})

app.delete('/teams/:id', async (req, res) => {
    await Team.findByIdAndDelete(req.params.id)
    res.redirect('/teams')
})

app.post('/teams/:id/comments', validateComment, async (req, res) => {
    const team = await Team.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.date = getDate()
    team.comments.push(comment)
    comment.save()
    team.save()
    res.redirect(`/teams/${team._id}`)
})

app.delete('/teams/:id/comments/:commentId', async (req, res) => {
    const { id, commentId } = req.params
    await Team.findByIdAndUpdate(id, { $pull: { comments: commentId } })
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/teams/${id}`)
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