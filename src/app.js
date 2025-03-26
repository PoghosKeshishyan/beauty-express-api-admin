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
app.use('/auth', require('./routes/auth'));
app.use('/items', require('./routes/items'));
app.use('/navbars', require('./routes/navbars'));

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
});