const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const footers = await prisma.footer.findMany();
    res.render('footers/footers', { footers, user, title: 'Footers', layout: 'base' });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('footers/create_footer', { error: null, user, title: 'Create Footer', layout: 'base' });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (
        !data.youtube_icon || 
        !data.vk_icon || 
        !data.instagram_icon || 
        !data.facebook_icon || 
        !data.address || 
        !data.phone_image || 
        !data.phone
    ) {
        return res.render('footers/create_footer', { 
            error: 'All fields are required', user, title: 'Create Footer', layout: 'base',
        });
    }

    await prisma.footer.create({
        data: {
            youtube_icon: data.youtube_icon,
            vk_icon: data.vk_icon,
            instagram_icon: data.instagram_icon,
            facebook_icon: data.facebook_icon,
            address: data.address,
            phone_image: data.phone_image,
            phone: data.phone
        },
    });

    res.redirect('/footers');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const footer = await prisma.footer.findUnique({
        where: {
            id,
        },
    });

    if (!footer) {
        return res.redirect('/footers');
    }

    res.render('footers/update_footer', { footer, error: null, user, title: 'Edit Footer', layout: 'base' });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const footer = await prisma.footer.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!footer) {
        return res.redirect('/footers');
    }

    if (!data.youtube_icon || !data.vk_icon || !data.instagram_icon || !data.facebook_icon ||
        !data.address || !data.phone_image || !data.phone) {
        return res.render('footers/update_footer', { 
            error: 'All fields are required', footer, user, title: 'Edit Footer', layout: 'base',
        });
    }

    await prisma.footer.update({
        where: {
            id,
        },
        data: {
            youtube_icon: data.youtube_icon,
            vk_icon: data.vk_icon,
            instagram_icon: data.instagram_icon,
            facebook_icon: data.facebook_icon,
            address: data.address,
            phone_image: data.phone_image,
            phone: data.phone
        },
    });

    res.redirect('/footers');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.footer.delete({
        where: {
            id,
        },
    });

    res.redirect('/footers');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};