const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

// GET REQUESTS
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.get('/userProfile', (req, res, next) => res.render('users/userProfile'));

// POST REQUESTS
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  // validation
  if (!username || !email || !password) {
    res.render('auth/signup', {
      errorMessage:
        'All fields are mandatory. Please provide your username, email and password.',
    });
    return;
  }
  if (password.length < 4) {
    res.render('auth/signup', {
      errorMessage: 'Password has to be minimum 4 characters',
    });
    return;
  }
  // if (username === '') {
  //   res.render('auth/signup', { message: 'Username cannot be empty' });
  //   return;
  // }

  User.findOne({ username, email }).then((userFromDB) => {
    console.log(userFromDB);
    // validation => if the username exists
    if (username !== null) {
      res.render('auth/signup', {
        errorMessage: 'Username is already taken',
      });
    } else if (email !== null) {
      res.render('auth/signup', {
        errorMessage: 'Email is already taken',
      });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      console.log(hash);

      User.create({ username, email, password: hash })
        .then((createdUser) => {
          console.log(createdUser);
          res.redirect('/userProfile');
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
    if (userFromDB === null) {
      // User not found in database => Show login form
      res.render('auth/login', { errorMessage: "The email doesn't exist" });
      return;
    }

    // User found in database
    // Check if password from input form matches hashed password from database
    if (bcrypt.compareSync(password, userFromDB.password)) {
      // Password is correct => Login user
      // req.session is an object provided by "express-session"

      req.session.user = userFromDB;
      res.redirect('/userProfile');
    } else {
      res.render('auth/login', { errorMessage: 'Wrong password' });
      return;
    }
  });
});

router.get('/auth/logout', (req, res, next) => {
  // Logout user
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;