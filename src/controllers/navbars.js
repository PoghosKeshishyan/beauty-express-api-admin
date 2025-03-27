const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const navbars = await prisma.navbar.findMany();
    res.render('navbars/navbars', { navbars, user, title: 'Navbars', layout: 'base' });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('navbars/create_navbar', { error: null, user, title: 'Create Navbar', layout: 'base' });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.title || !data.url) {
        return res.render('navbars/create_navbar', { 
            error: 'All fields are required', user, title: 'Create Navbar', layout: 'base',
        });
    }

    await prisma.navbar.create({
        data,
    });

    res.redirect('/navbars');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const navbar = await prisma.navbar.findUnique({
        where: {
            id,
        },
    });

    if (!navbar) {
        return res.redirect('/navbars');
    }

    res.render('navbars/update_navbar', { navbar, error: null, user, title: 'Edit Navbar', layout: 'base' });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const navbar = await prisma.navbar.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!navbar) {
        return res.redirect('/navbars');
    }

    if (!data.title || !data.url) {
        return res.render('navbars/update_navbar', { 
            error: 'All fields are required', navbar, user, title: 'Edit Navbar', layout: 'base',
        });
    }

    await prisma.navbar.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/navbars');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.navbar.delete({
        where: {
            id,
        },
    });

    res.redirect('/navbars');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};