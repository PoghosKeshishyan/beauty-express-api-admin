const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const logos = await prisma.logo.findMany();
    res.render('logos/logos', { logos, user, title: 'Logos', layout: 'base' });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('logos/create_logo', { error: null, user, title: 'Create Logo', layout: 'base' });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.image || !data.title) {
        return res.render('logos/create_logo', { 
            error: 'All fields are required', user, title: 'Create Logo', layout: 'base',
        });
    }

    await prisma.logo.create({
        data,
    });

    res.redirect('/logos');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const logo = await prisma.logo.findUnique({
        where: {
            id,
        },
    });

    if (!logo) {
        return res.redirect('/logos');
    }

    res.render('logos/update_logo', { logo, error: null, user, title: 'Edit Logo', layout: 'base' });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const logo = await prisma.logo.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!logo) {
        return res.redirect('/logos');
    }

    if (!data.image || !data.title) {
        return res.render('logos/update_logo', { 
            error: 'All fields are required', logo, user, title: 'Edit Logo', layout: 'base',
        });
    }

    await prisma.logo.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/logos');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.logo.delete({
        where: {
            id,
        },
    });

    res.redirect('/logos');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};
