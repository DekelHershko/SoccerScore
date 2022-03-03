const express = require('express')
const { isLoggedIn, isAuthor } = require('../middlewares/authorizationMiddleware')
const { validateTeam } = require('../middlewares/schemaMiddleware')
const teamsController = require('../controllers/teamsController')
const multer = require('multer')
const { storage } = require('../cloudinary')

const upload = multer({ storage })
const router = express.Router()

router.route('/')
    .get(teamsController.index)
    .post(upload.array('images'), validateTeam, teamsController.createTeam)

router.get('/new', isLoggedIn, teamsController.renderNewForm)

router.route('/:id')
    .get(teamsController.getTeam)
    .put(validateTeam, isAuthor, isLoggedIn, teamsController.editTeam)
    .delete(isLoggedIn, isAuthor, teamsController.deleteTeam)

router.get('/:id/edit', isLoggedIn, isAuthor, teamsController.renderEditForm)

module.exports = router