const Team = require('../models/team')

module.exports.index = async (req, res) => {
    const allTeams = await Team.find({})
    res.render('teams/index', { allTeams })
}

module.exports.createTeam = async (req, res) => {
    const newTeam = new Team(req.body.team)
    newTeam.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    newTeam.author = req.user._id
    newTeam.save()
    req.flash('success', 'Successfully added a new team!')
    res.redirect(`teams/${newTeam._id}`)
}

module.exports.renderNewForm = (req, res) => {
    res.render('teams/new')
}

module.exports.getTeam = async (req, res) => {
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
}

module.exports.renderEditForm = async (req, res) => {
    const team = await Team.findById(req.params.id)
    if (!team) {
        req.flash('error', 'Cannot find that team!')
        res.redirect('/teams')
    }
    res.render('teams/edit', { team })
}

module.exports.editTeam = async (req, res) => {
    await Team.findByIdAndUpdate(req.params.id, { ...req.body.team })
    req.flash('success', 'Successfully updated the team!')
    res.redirect(`${req.params.id}`)
}

module.exports.deleteTeam = async (req, res) => {
    await Team.findByIdAndDelete(req.params.id)
    req.flash('success', 'Successfully deleted the team!')
    res.redirect('/teams')
}