const express = require('express');
const router = express.Router();
const { get_images, upload_image, delete_image } = require('../controllers/images');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

router.get('/', auth, get_images);
router.post('/upload', auth, upload.single('image'), upload_image);
router.post('/delete', auth, delete_image);

module.exports = router;
