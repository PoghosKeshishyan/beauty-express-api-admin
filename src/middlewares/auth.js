const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/users/login');
    }

    next();
};

module.exports = {
    auth,
};