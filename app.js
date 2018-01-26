require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const logger = require('winston');
const mongoose = require('mongoose');
const getenv = require('getenv');
const basicAuth = require('express-basic-auth');

const index = require('./server/routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(basicAuth({
  users: { admin: getenv('ADMIN_SECRET') },
  challenge: true
}));


app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res) => res.render('error', { status: 404 }));

// error handler
app.use((err, req, res) => res.render('error', { status: 500 }));

// config mongoose
mongoose.Promise = Promise;

const PORT = getenv('PORT');
const MONGO_URL = getenv('MONGO_URL');

mongoose
  .connect(MONGO_URL)
  .then(() => app.listen(PORT, () => logger.info(`Connected to port ${PORT}`)));
