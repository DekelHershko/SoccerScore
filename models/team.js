const mongoose = require('mongoose')
const Comment = require('./comment')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    title: String,
    country: String,
    description: String,
    crest: String,
    year: Number,
    championsLeague: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

teamSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Team', teamSchema)

