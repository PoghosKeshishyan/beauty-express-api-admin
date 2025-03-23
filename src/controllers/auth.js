const { prisma } = require('../../prisma/prisma-client');
const bcrypt = require('bcrypt');

const register_get = (req, res) => {
    const user = req.session.user;
    res.render('auth/register', { error: null, title: 'Register', user, layout: 'base' });
};

const register_post = async (req, res) => {
    const user = req.session.user;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('auth/register', { 
            error: 'Please fill in all fields', title: 'Register', user, layout: 'base' 
        });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
        return res.render('auth/register', {
            error: 'Username already exists', title: 'Register', user, layout: 'base',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const new_user = await prisma.user.create({
        data: { username, password: hashedPassword },
    });

    req.session.user = new_user.username;
    res.redirect('/');
};

const login_get = (req, res) => {
    const user = req.session.user;
    res.render('auth/login', { error: null, title: 'Login', user, layout: 'base' });
};

const login_post = async (req, res) => {
    const user = req.session.user;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('auth/login', { 
            error: 'Please fill in all fields', title: 'Login', user, layout: 'base' 
        });
    }

    const userFromDB = await prisma.user.findUnique({ where: { username } });

    if (!userFromDB || !(await bcrypt.compare(password, userFromDB.password))) {
        return res.render('auth/login', { 
            error: 'Invalid credentials', title: 'Login', user, layout: 'base',
        });
    }

    req.session.user = userFromDB.username;
    res.redirect('/');
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout,
}