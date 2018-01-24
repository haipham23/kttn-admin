require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getenv = require('getenv');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// config mongoose
mongoose.Promise = Promise;

const MONGO_URL = getenv('MONGO_URL_E2E');

mongoose.connect(MONGO_URL);

module.exports = app;
