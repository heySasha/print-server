require('./config');
require('./db/mongoose');
require('./services/passport');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(cors());



app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/orderRoutes')(app);



app.use(express.static( path.resolve(__dirname, 'public') ));

app.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

module.exports = { app };