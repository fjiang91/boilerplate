const router = require('express').Router();
const passport = require('passport');
const { User } = require('../models/db');

router.use('/google', require('./oauth/googleOAuth'));

router.get('/me', async (req, res, next) => {
  res.json(req.user);
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) res.status(401).send('User not found!')
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect Password')
    } else {
      req.login(user, err => {
        if (err) next(err)
        else res.json(user)
      })
    }
  } catch (error) {
    next(error)
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const [ user, wasCreated ] = await User.findOrCreate({
      where: {
        email: req.body.email
      }, defaults: {
        password: req.body.password
      }
    })
    req.login(user, err => {
      if (err) next (err)
      else res.json(user);
    })
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', async (req, res, next) => {
  req.logout();
  req.session.destory();
  res.sendStatus(204);
});

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(done);
});

module.exports = router;
