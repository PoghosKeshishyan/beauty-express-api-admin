const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const items = await prisma.item.findMany();
    res.render('items/items', { items, user, title: 'Items', layout: 'base' });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('items/create_item', { error: null, user, title: 'Create Item', layout: 'base' });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.title || !data.description) {
        return res.render('items/create_item', { 
            error: 'All fields are required', user, title: 'Create Item', layout: 'base',
        });
    }

    await prisma.item.create({
        data,
    });

    res.redirect('/items');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const item = await prisma.item.findUnique({
        where: {
            id,
        },
    });

    if (!item) {
        return res.redirect('/items');
    }

    res.render('items/update_item', { item, error: null, user, title: 'Edit Item', layout: 'base' });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const item = await prisma.item.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!item) {
        return res.redirect('/items');
    }

    if (!data.title || !data.description) {
        return res.render('items/update_item', { 
            error: 'All fields are required', item, user, title: 'Edit Item', layout: 'base',
        });
    }

    await prisma.item.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/items');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.item.delete({
        where: {
            id,
        },
    });

    res.redirect('/items');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};