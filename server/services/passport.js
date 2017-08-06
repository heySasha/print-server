const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				const user = await User.findByCredentials({ email, password });
				done(null, user);
			} catch (err) {
				done(err);
			}
		}
	)
);

passport.use(
	new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: '/login/facebook/return',
        profileFields: ['id', 'displayName', 'emails']
	}, async (accessToken, refreshToken, profile, done) => {
		try {
			const facebookId = profile.id;
			const email = profile.emails[0].value;
			const name = profile.displayName;

			const existingUser = await User.findOne({ email });

			if (existingUser) {
				existingUser.facebookId = existingUser.facebookId || facebookId;
				return done(null, existingUser);
			}

			const user = await new User({
				facebookId,
				email,
				name
			}).save();

			done(null, user);
		} catch (err) {
            done(err);
		}
	})
);