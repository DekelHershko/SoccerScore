const express = require('express')
const passport = require('passport')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.route('/register')
    .get(usersController.renderRegisterForm)
    .post(usersController.registerUser)

router.route('/login')
    .get(usersController.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersController.loginUser)

router.get('/logout', usersController.logoutUser)

module.exports = router