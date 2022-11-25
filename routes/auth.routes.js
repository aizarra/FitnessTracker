const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const { isLoggedIn } = require('../middleware/route-guard.js');

// GET REQUESTS
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/user/userProfile');
  }
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/user/userProfile');
  }
  res.render('auth/login');
});

// POST REQUESTS
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  // validation
  if (!username || !email || !password) {
    res.render('auth/signup', {
      errorMessage: 'All fields are mandatory.',
    });
    return;
  }
  if (password.length < 4) {
    res.render('auth/signup', {
      errorMessage: 'Password has to be minimum 4 characters',
    });
    return;
  }

  User.findOne({ username }).then((userFromDB) => {
    // validation => if the username exists
    if (userFromDB !== null) {
      res.render('auth/signup', {
        errorMessage: 'Username is already taken',
      });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username, email, password: hash })
        .then((userFromDB) => {
          req.session.currentUser = userFromDB;
          res.redirect('/user/userProfile');
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Find user in database by username
  User.findOne({ email }).then((userFromDB) => {
    if (!userFromDB) {
      // User not found in database => Show login form
      res.render('auth/login', { errorMessage: 'The email is not registered' });
      return;
    }

    // User found in database
    // Check if password from input form matches hashed password from database
    if (bcrypt.compareSync(password, userFromDB.password)) {
      // Password is correct => Login user
      // req.session is an object provided by "express-session"

      req.session.currentUser = userFromDB;
      res.redirect('/user/userProfile');
    } else {
      res.render('auth/login', { errorMessage: 'Wrong password' });
      return;
    }
  });
});

router.post('/logout', (req, res, next) => {
  // Logout user
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
