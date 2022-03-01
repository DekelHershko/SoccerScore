const express = require('express')
const Team = require('../models/team')
const { isLoggedIn, validateTeam, isAuthor } = require('../middleware')

const router = express.Router()

router.get('/', async (req, res) => {
    const allTeams = await Team.find({})
    res.render('teams/index', { allTeams })
})

router.post('/', validateTeam, async (req, res) => {
    const newTeam = new Team(req.body.team)
    newTeam.author = req.user._id
    newTeam.save()
    req.flash('success', 'Successfully added a new team!')
    res.redirect(`teams/${newTeam._id}`)
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('teams/new')
})

router.get('/:id', async (req, res) => {
    const team = await Team.findById(req.params.id).populate({
        path: 'author',
        //strictPopulate: false
    })
    await team.populate({ path: 'comments', populate: 'author' })

    if (!team) {
        req.flash('error', 'Cannot find that team!')
        res.redirect('/teams')
    }
    res.render('teams/show', { team })
})

router.get('/:id/edit', isLoggedIn, isAuthor, async (req, res) => {
    const team = await Team.findById(req.params.id)
    if (!team) {
        req.flash('error', 'Cannot find that team!')
        res.redirect('/teams')
    }
    res.render('teams/edit', { team })
})

router.put('/:id/', validateTeam, isAuthor, isLoggedIn, async (req, res) => {
    await Team.findByIdAndUpdate(req.params.id, { ...req.body.team })
    req.flash('success', 'Successfully updated the team!')
    res.redirect(`${req.params.id}`)
})

router.delete('/:id', isLoggedIn, isAuthor, async (req, res) => {
    await Team.findByIdAndDelete(req.params.id)
    req.flash('success', 'Successfully deleted the team!')
    res.redirect('/teams')
})

module.exports = router