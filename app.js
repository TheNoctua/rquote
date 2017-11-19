const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes.js');
const profileRoutes = require('./routes/profile-routes.js');
const passportSetup = require('./config/passport-setup');
const publicRoutes = require('./routes/public-routes');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
    useMongoClient: true
    console.log('Connected to mongodb');
  });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/quote', publicRoutes);

app.get('/', (req, res) => {
 res.render('home', {user:req.user})
});

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(4000, () => {
    console.log('API is ready!');
});