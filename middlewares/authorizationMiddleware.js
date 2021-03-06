
const Team = require('../models/team')
const Comment = require('../models/comment')

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        next()
    else {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must log in to view this page')
        res.redirect('/login')
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const team = await Team.findById(id)
    if (!team.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permissions to do that')
        return res.redirect(`/teams/${id}`)
    }
    next()
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params
    const comment = await Comment.findById(commentId)
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permissions to do that')
        return res.redirect(`/teams/${id}`)
    }
    next()
}