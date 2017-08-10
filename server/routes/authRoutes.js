const passport = require('passport');
const _ = require('lodash');

const { User } = require('../models/user');

module.exports = app => {
	app.get('/login', (req, res) => {
		res.send('Login');
	});

	app.post(
		'/login',
		passport.authenticate('local', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/');
		}
	);

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get(
		'/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		(req, res) => {
			res.send(req.user);
		}
	);

	app.post('/signin', async (req, res) => {
		try {
			const body = _.pick(req.body, [
				'name',
				'email',
				'password',
				'mobilePhone'
			]);

			await new User(body).save();

			res.redirect('/');
		} catch (err) {
			res.status(400).send();
		}
	});

	app.get('/', (req, res) => {
		res.send('Home');
	});

	/*  FACEBOOK  */

	app.get('/login/facebook', passport.authenticate('facebook'));

    app.get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
    });
};
