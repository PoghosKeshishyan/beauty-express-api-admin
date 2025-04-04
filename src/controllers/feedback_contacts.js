const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const feedback_contacts = await prisma.feedback_contact.findMany();
    res.render('feedback_contacts/feedback_contacts', { 
        feedback_contacts, user, title: 'Feedback Contacts', layout: 'base', 
    });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('feedback_contacts/create_feedback_contact', { 
        error: null, user, title: 'Create Feedback Contact', layout: 'base', 
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.image || !data.title || !data.descr || !data.btn_text || !data.btn_url) {
        return res.render('feedback_contacts/create_feedback_contact', { 
            error: 'All fields are required', user, title: 'Create Feedback Contact', layout: 'base',
        });
    }

    await prisma.feedback_contact.create({
        data,
    });

    res.redirect('/feedback_contacts');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const feedback_contact = await prisma.feedback_contact.findUnique({
        where: {
            id,
        },
    });

    if (!feedback_contact) {
        return res.redirect('/feedback_contacts');
    }

    res.render('feedback_contacts/update_feedback_contact', { 
        feedback_contact, error: null, user, title: 'Edit Feedback Contact', layout: 'base', 
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const feedback_contact = await prisma.feedback_contact.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!feedback_contact) {
        return res.redirect('/feedback_contacts');
    }

    if (!data.image || !data.title || !data.descr || !data.btn_text || !data.btn_url) {
        return res.render('feedback_contacts/update_feedback_contact', { 
            error: 'All fields are required', feedback_contact, user, title: 'Edit Feedback Contact', layout: 'base',
        });
    }

    await prisma.feedback_contact.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/feedback_contacts');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.feedback_contact.delete({
        where: {
            id,
        },
    });

    res.redirect('/feedback_contacts');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};
