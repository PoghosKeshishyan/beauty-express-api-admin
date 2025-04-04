const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const offers_headings = await prisma.offers_heading.findMany();
        const offers_items = await prisma.offers_item.findMany();
        res.status(200).json({ offers_heading: offers_headings[0], offers_items });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching data' });
    }
});

module.exports = router;