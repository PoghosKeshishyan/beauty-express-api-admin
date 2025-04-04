const home = (req, res) => {
    const user = req.session.user;
    const api_list_endpoints = [
        'api/header', '/api/intro', '/api/offers', '/api/feedback', '/api/footer'
    ];
    res.render('home/home', { title: 'Home', api_list_endpoints, user, layout: 'base' });
};

module.exports = {
    home,
}