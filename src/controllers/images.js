const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '../public/images');

const get_images = (req, res) => {
    const user = req.session.user;
    const allowed_ext = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.bmp', '.webp'];

    const files = fs.readdirSync(UPLOAD_DIR);

    const images = files.filter(file => {
        return allowed_ext.includes(path.extname(file).toLowerCase());
    });

    res.render('images/images', {
        images, user, title: 'Uploaded Images', layout: 'base',
    });
};

const upload_image = (req, res) => {
    res.redirect('/images');
};

const delete_image = async (req, res) => {
    const { filename } = req.body;
    const file_path = path.join(UPLOAD_DIR, filename);

    if (fs.existsSync(file_path)) {
        fs.unlinkSync(file_path);
        res.redirect('/images');
    }
};

module.exports = {
    get_images,
    upload_image,
    delete_image,
};