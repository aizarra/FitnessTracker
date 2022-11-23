const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');

router.get('/user/tracker', (req, res, next) => {
  User.findById(req.session.user._id)
    .populate({
      path: 'chosenExercise',
      model: 'Exercise',
    })
    .then((user) => {
      res.render('tracker', { user });
    });
});
