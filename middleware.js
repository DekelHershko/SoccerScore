module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        next()
    else {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must log in to view this page')
        res.redirect('/login')
    }
}