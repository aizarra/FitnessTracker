const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const { isLoggedIn } = require('../middleware/route-guard.js');

router.get('/user/userProfile', isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.render('users/userProfile', { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/user/updateProfile', (req, res, next) => {
  res.render('users/updateProfile');
});

router.post('/user/updateProfile', (req, res, next) => {
  const { newUsername, newPassword } = req.body;

  if (newUsername === '' && newPassword === '') {
    res.redirect('/user/userProfile');
  } else if (newUsername !== '' && newPassword !== '') {
    const salt = bcrypt.genSaltSync();
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        username: newUsername,
        password: hashedNewPassword,
      },
      { new: true }
    )
      .then(() => {
        res.redirect('/user/userProfile');
      })
      .catch((err) => console.log(err));
  } else if (newPassword !== '' && newUsername === '') {
    const salt = bcrypt.genSaltSync();
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        password: hashedNewPassword,
      },
      { new: true }
    )
      .then(() => {
        res.redirect('/user/userProfile');
      })
      .catch((err) => console.log(err));
  } else if (newUsername !== '' && newPassword === '') {
    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        username: newUsername,
      },
      { new: true }
    )
      .then(() => {
        res.redirect('/userProfile');
      })
      .catch((err) => console.log(err));
  }
});

router.post('/user/deleteProfile', (req, res, next) => {
  User.findByIdAndDelete(req.session.currentUser._id)
    .then(req.session.destroy(() => res.redirect('/')))
    .catch((err) => next(err));
});

module.exports = router;
