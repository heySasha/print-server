const passport = require('passport');
const _ = require('lodash');

const { User } = require('../models/user');
const { Order } = require('../models/order');

module.exports = app => {
	app.get('/login', (req, res) => {
		res.render('login', { user: req.user });
	});

	app.post(
		'/login',
		passport.authenticate('local', { failureRedirect: '/login' }),
		(req, res) => {
			res.status(200).send();
		}
	);

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get(
		'/profile',
		require('connect-ensure-login').ensureLoggedIn(),
        async (req, res) => {
			const orders = await Order.find({
				_client: req.user._id
			}) || [];

			res.render('profile', {
				user: req.user,
				orders
			});
		}
	);

	app.get('/register', (req, res) => {
		res.render('register', { user: req.user });
	});

	app.post('/signin', async (req, res) => {
		try {
			const body = _.pick(req.body, [
				'name',
				'email',
				'password',
				'mobilePhone'
			]);

			await new User(body).save();

            res.status(200).send();
		} catch (err) {
			res.status(400).send();
		}
	});


	/*  FACEBOOK  */

	app.get('/login/facebook', passport.authenticate('facebook'));

    app.get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
    });
};
