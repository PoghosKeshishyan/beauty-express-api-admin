const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const offers_items = await prisma.offers_item.findMany();
    res.render('offers_items/offers_items', { 
        offers_items, user, title: 'Offers Items', layout: 'base', 
    });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('offers_items/create_offers_item', { 
        error: null, user, title: 'Create Offer Item', layout: 'base', 
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.image || !data.descr || !data.price || !data.btn_text || !data.btn_url) {
        return res.render('offers_items/create_offers_item', { 
            error: 'All fields are required', user, title: 'Create Offer Item', layout: 'base',
        });
    }

    await prisma.offers_item.create({
        data,
    });

    res.redirect('/offers_items');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const offers_item = await prisma.offers_item.findUnique({
        where: {
            id,
        },
    });

    if (!offers_item) {
        return res.redirect('/offers-items');
    }

    res.render('offers_items/update_offers_item', { 
        offers_item, error: null, user, title: 'Edit Offer Item', layout: 'base', 
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const offers_item = await prisma.offers_item.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!offers_item) {
        return res.redirect('/offers_items');
    }

    if (!data.image || !data.descr || !data.price || !data.btn_text || !data.btn_url) {
        return res.render('offers_items/update_offers_item', { 
            error: 'All fields are required', offers_item, user, title: 'Edit Offer Item', layout: 'base',
        });
    }

    await prisma.offers_item.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/offers_items');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.offers_item.delete({
        where: {
            id,
        },
    });

    res.redirect('/offers_items');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};