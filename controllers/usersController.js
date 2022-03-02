const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res, next) => {
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
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    const { username } = req.body
    const redirectUrl = req.session.returnTo || '/teams'
    delete req.session.returnTo
    req.flash('success', `Great seeing you again, ${username}!`)
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req, res) => {
    req.logOut()
    req.flash('success', 'Until next time!')
    res.redirect('/teams')
}