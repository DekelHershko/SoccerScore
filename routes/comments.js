const express = require('express')
const mongoose = require('mongoose')
const { commentValidateSchema } = require('../schemas.js')
const Team = require('../models/team')
const Comment = require('../models/comment')

const router = express.Router({ mergeParams: true })

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

router.post('/', validateComment, async (req, res) => {
    const team = await Team.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.date = getDate()
    team.comments.push(comment)
    comment.save()
    team.save()
    req.flash('success', 'Successfully added the comment!')
    res.redirect(`/teams/${team._id}`)
})

router.delete('/:commentId', async (req, res) => {
    const { id, commentId } = req.params
    await Team.findByIdAndUpdate(id, { $pull: { comments: commentId } })
    await Comment.findByIdAndDelete(commentId)
    req.flash('success', 'Successfully removed the comment!')
    res.redirect(`/teams/${id}`)
})

module.exports = router