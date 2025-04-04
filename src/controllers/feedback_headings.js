const { prisma } = require('../../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const feedback_headings = await prisma.feedback_heading.findMany();
    res.render('feedback_headings/feedback_headings', { 
        feedback_headings, user, title: 'Feedback Headings', layout: 'base',
    });
};

const create_page = (req, res) => {
    const user = req.session.user;
    res.render('feedback_headings/create_feedback_heading', { 
        error: null, user, title: 'Create Feedback Heading', layout: 'base', 
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const data = req.body;

    if (!data.heading) {
        return res.render('feedback_headings/create_feedback_heading', { 
            error: 'Heading is required', user, title: 'Create Feedback Heading', layout: 'base',
        });
    }

    await prisma.feedback_heading.create({
        data,
    });

    res.redirect('/feedback_headings');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    
    const feedback_heading = await prisma.feedback_heading.findUnique({
        where: {
            id,
        },
    });

    if (!feedback_heading) {
        return res.redirect('/feedback_headings');
    }

    res.render('feedback_headings/update_feedback_heading', { 
        feedback_heading, error: null, user, title: 'Edit Feedback Heading', layout: 'base', 
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const data = req.body;

    const feedback_heading = await prisma.feedback_heading.findUnique({ 
        where: { 
            id, 
        }, 
    });

    if (!feedback_heading) {
        return res.redirect('/feedback_headings');
    }

    if (!data.heading) {
        return res.render('feedback_headings/update_feedback_heading', { 
            error: 'Heading is required', feedback_heading, user, title: 'Edit Feedback Heading', layout: 'base',
        });
    }

    await prisma.feedback_heading.update({
        where: {
            id,
        },
        data,
    });

    res.redirect('/feedback_headings');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.feedback_heading.delete({
        where: {
            id,
        },
    });

    res.redirect('/feedback_headings');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove,
};