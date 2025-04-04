const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const feedbacks_headings = await prisma.feedback_heading.findMany();
        const feedback_contacts = await prisma.feedback_contact.findMany();
        res.status(200).json({ feedbacks_heading: feedbacks_headings[0], feedback_contacts });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching data' });
    }
});

module.exports = router;