const Team = require('../models/team')
const Comment = require('../models/comment')

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


module.exports.createComment = async (req, res) => {
    const team = await Team.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.author = req.user._id
    comment.date = getDate()
    team.comments.push(comment)
    comment.save()
    team.save()
    req.flash('success', 'Successfully added the comment!')
    res.redirect(`/teams/${team._id}`)
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params
    await Team.findByIdAndUpdate(id, { $pull: { comments: commentId } })
    await Comment.findByIdAndDelete(commentId)
    req.flash('success', 'Successfully removed the comment!')
    res.redirect(`/teams/${id}`)
}