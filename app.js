const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const sess = {
  secret: process.env.JWT_privateKey,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};
app.use(session(sess));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', routes);

module.exports = app
