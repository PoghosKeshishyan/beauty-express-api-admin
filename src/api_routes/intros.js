const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma/prisma-client');  

router.get('/', async (req, res) => {
    try {
        const intro = await prisma.intro.findMany(); 
        res.status(200).json(intro[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching data' });
    }
});

module.exports = router;