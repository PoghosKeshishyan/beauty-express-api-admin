const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const offers_headings = await prisma.offers_heading.findMany();
    res.render('offers_headings/offers_headings', { 
        offers_headings, user, title: 'Offers Headings', layout: 'base',
    });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('offers_headings/create_offers_heading', { 
        error: null, user, title: 'Create Offers Heading', layout: 'base', 
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.heading) {
        return res.render('offers_headings/create_offers_heading', { 
            error: 'Heading is required', user, title: 'Create Offers Heading', layout: 'base',
        });
    }

    await prisma.offers_heading.create({
        data,
    });

    res.redirect('/offers_headings');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const offers_heading = await prisma.offers_heading.findUnique({
        where: {
            id,
        },
    });

    if (!offers_heading) {
        return res.redirect('/offers_headings');
    }

    res.render('offers_headings/update_offers_heading', { 
        offers_heading, error: null, user, title: 'Edit Offers Heading', layout: 'base', 
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const offers_heading = await prisma.offers_heading.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!offers_heading) {
        return res.redirect('/offers_headings');
    }

    if (!data.heading) {
        return res.render('offers_headings/update_offers_heading', { 
            error: 'Heading is required', offers_heading, user, title: 'Edit Offers Heading', layout: 'base',
        });
    }

    await prisma.offers_heading.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/offers_headings');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.offers_heading.delete({
        where: {
            id,
        },
    });

    res.redirect('/offers_headings');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};