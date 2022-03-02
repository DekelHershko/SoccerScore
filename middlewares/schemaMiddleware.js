const { teamValidateSchema, commentValidateSchema } = require('../schemas.js')

module.exports.validateTeam = (req, res, next) => {
    const { error } = teamValidateSchema.validate(req.body)
    if (error) {
        const message = error.details.map(e => e.message).join(', ')
        throw new Error(message)
    }
    else {
        next()
    }
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentValidateSchema.validate(req.body)
    if (error) {
        const message = error.details.map(e => e.message).join(', ')
        throw new Error(message)
    }
    else {
        next()
    }
}