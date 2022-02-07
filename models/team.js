const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    title: String,
    country: String,
    year: Number,
    championsLeague: Number
})

module.exports = mongoose.model('Team', teamSchema)

