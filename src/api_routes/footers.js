const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const footer = await prisma.footer.findMany();
        res.status(200).json(footer[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching data' });
    }
});

module.exports = router;