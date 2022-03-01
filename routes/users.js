const express = require('express')
const User = require('../models/user')
const passport = require('passport')

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.logIn(registeredUser, (error) => {
            if (error)
                return next(error)
            req.flash('success', 'Successfully registered to Soccer Score!')
            res.redirect('/teams')
        })
    }
    catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const { username } = req.body
    const redirectUrl = req.session.returnTo || '/teams'
    delete req.session.returnTo
    req.flash('success', `Great seeing you again, ${username}!`)
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('success', 'Until next time!')
    res.redirect('/teams')
})

module.exports = router