const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    description: String,
    date: String
})

module.exports = mongoose.model('Comment', commentSchema)