const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const intros = await prisma.intro.findMany();
    res.render('intros/intros', { intros, user, title: 'Intros', layout: 'base' });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('intros/create_intro', { error: null, user, title: 'Create Intro', layout: 'base' });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.image || !data.title || !data.descr || !data.btn_text || !data.btn_url) {
        return res.render('intros/create_intro', { 
            error: 'All fields are required', user, title: 'Create Intro', layout: 'base',
        });
    }

    await prisma.intro.create({
        data,
    });

    res.redirect('/intros');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const intro = await prisma.intro.findUnique({
        where: {
            id,
        },
    });

    if (!intro) {
        return res.redirect('/intros');
    }

    res.render('intros/update_intro', { intro, error: null, user, title: 'Edit Intro', layout: 'base' });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const intro = await prisma.intro.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!intro) {
        return res.redirect('/intros');
    }

    if (!data.image || !data.title || !data.descr || !data.btn_text || !data.btn_url) {
        return res.render('intros/update_intro', { 
            error: 'All fields are required', intro, user, title: 'Edit Intro', layout: 'base',
        });
    }

    await prisma.intro.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/intros');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.intro.delete({
        where: {
            id,
        },
    });

    res.redirect('/intros');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};