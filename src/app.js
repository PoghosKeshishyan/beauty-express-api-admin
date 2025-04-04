const express = require('express');
const path = require('path');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'base');


app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));
app.use('/logos', require('./routes/logos'));
app.use('/navbars', require('./routes/navbars'));
app.use('/intros', require('./routes/intros'));
app.use('/offers_headings', require('./routes/offers_headings'));
app.use('/offers_items', require('./routes/offers_items'));
app.use('/feedback_headings', require('./routes/feedback_headings'));
app.use('/feedback_contacts', require('./routes/feedback_contacts'));
app.use('/footers', require('./routes/footers'));
app.use('/images', require('./routes/images'));


app.use('/api/header', require('./api_routes/headers'));
app.use('/api/intro', require('./api_routes/intros'));
app.use('/api/offers', require('./api_routes/offers'));
app.use('/api/feedback', require('./api_routes/feedbacks'));
app.use('/api/footer', require('./api_routes/footers'));


app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
});