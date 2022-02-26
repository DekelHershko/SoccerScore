const express = require('express')
const mongoose = require('mongoose')
const { teamValidateSchema } = require('../schemas.js')
const Team = require('../models/team')

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

const router = express.Router()

router.get('/', async (req, res) => {
    const allTeams = await Team.find({})
    res.render('teams/index', { allTeams })
})

router.post('/', validateTeam, async (req, res) => {
    const newTeam = new Team(req.body.team)
    newTeam.save()
    res.redirect(`teams/${newTeam._id}`)
})

router.get('/new', (req, res) => {
    res.render('teams/new')
})

router.get('/:id', async (req, res) => {
    const team = await Team.findById(req.params.id).populate('comments')
    res.render('teams/show', { team })
})

router.get('/:id/edit', async (req, res) => {
    const team = await Team.findById(req.params.id)
    res.render('teams/edit', { team })
})

router.put('/:id/', validateTeam, async (req, res) => {
    await Team.findByIdAndUpdate(req.params.id, { ...req.body.team })
    res.redirect(`${req.params.id}`)
})

router.delete('/:id', async (req, res) => {
    await Team.findByIdAndDelete(req.params.id)
    res.redirect('/teams')
})

module.exports = router