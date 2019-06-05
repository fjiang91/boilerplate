const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models/db');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
};

const googleAuthenticateCB = async (token, refreshToken, profile, done) => {
  try {
    let [user, wasCreated] = await User.findOrCreate({
      where: {
        googleId: profile.id,
      },
      defaults: {
        googleId: profile.id,
        email: profile.emails[0].value,
        imageUrl: profile.photos ? profile.photos[0].value : undefined,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
};

const googleStrategy = new GoogleStrategy(googleConfig, googleAuthenticateCB)

passport.use(googleStrategy);

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

// passport.serializeUser((user, done) => {
//   try {
//     done(null, user.id);
//   } catch (err) {
//     done(err);
//   }
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(user => done(null, user))
//     .catch(done);
// });

module.exports = router;
