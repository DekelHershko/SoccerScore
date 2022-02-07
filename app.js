const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

const Schema = mongoose.Schema
const Team = require('./models/team')
const app = express()

mongoose.connect('mongodb://localhost:27017/soccer-score')
    .then(() => console.log('Connection established to soccer-score db'))
    .catch((e) => console.log(`Error while trying to connect to soccer-score db ${e}`))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/teams', async (req, res) => {
    const allTeams = await Team.find({})
    res.render('teams/index', { allTeams })
})

app.post('/teams', async (req, res) => {
    const newTeam = new Team(req.body.team)
    newTeam.save()
    res.redirect(`teams/${newTeam._id}`)
})

app.get('/teams/new', (req, res) => {
    res.render('teams/new')
})

app.get('/teams/:id', async (req, res) => {
    const team = await Team.findById(req.params.id)
    res.render('teams/show', { team })
})

app.get('/teams/:id/edit', async (req, res) => {
    const team = await Team.findById(req.params.id)
    res.render('teams/edit', { team })
})

app.put('/teams/:id/', async (req, res) => {
    await Team.findByIdAndUpdate(req.params.id, { ...req.body.team })
    res.redirect(`${req.params.id}`)
})

app.delete('/teams/:id', async (req, res) => {
    await Team.findByIdAndDelete(req.params.id)
    res.redirect('/teams')
})

app.listen(3000, () => {
    console.log('Soccer Score server listening on port 3000')
})