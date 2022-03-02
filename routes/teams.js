const express = require('express')
const { isLoggedIn, validateTeam, isAuthor } = require('../middleware')
const teamsController = require('../controllers/teamsController')

const router = express.Router()

router.route('/')
    .get(teamsController.index)
    .post(validateTeam, teamsController.createTeam)

router.get('/new', isLoggedIn, teamsController.renderNewForm)

router.route('/:id')
    .get(teamsController.getTeam)
    .put(validateTeam, isAuthor, isLoggedIn, teamsController.editTeam)
    .delete(isLoggedIn, isAuthor, teamsController.deleteTeam)

router.get('/:id/edit', isLoggedIn, isAuthor, teamsController.renderEditForm)

module.exports = router