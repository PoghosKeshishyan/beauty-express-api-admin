const home = (req, res) => {
    const user = req.session.user;
    res.render('home/home', { title: 'Home', user, layout: 'base' });
};

module.exports = {
    home,
}