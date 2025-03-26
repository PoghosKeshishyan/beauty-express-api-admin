const express = require('express');
const router = express.Router();
const { get_list_page, get_create_page, post_create, get_edit_page, post_edit, remove } = require('../controllers/navbars');
const { auth } = require('../middlewares/auth');

router.get('/', auth, get_list_page);
router.get('/create', auth, get_create_page);
router.get('/edit/:id', auth, get_edit_page);
router.get('/remove/:id', auth, remove);
router.post('/create', auth, post_create);
router.post('/edit/:id', auth, post_edit);

module.exports = router;