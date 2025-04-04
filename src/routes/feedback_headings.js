const express = require('express');
const router = express.Router();
const { list_page, create_page, add, edit_page, edit, remove } = require('../controllers/feedback_headings');
const { auth } = require('../middlewares/auth');

router.get('/', auth, list_page);
router.get('/create', auth, create_page);
router.get('/edit/:id', auth, edit_page);
router.get('/remove/:id', auth, remove);
router.post('/create', auth, add);
router.post('/edit/:id', auth, edit);

module.exports = router;