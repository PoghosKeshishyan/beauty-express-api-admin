const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma/prisma-client');  

router.get('/', async (req, res) => {
    try {
        const logo = await prisma.logo.findMany(); 
        const navbar = await prisma.navbar.findMany();
        res.status(200).json({ logo: logo[0], navbar });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching data' });
    }
});

module.exports = router;