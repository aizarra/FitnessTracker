const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');

router.post('/user/chosenExercises', (req, res, next) => {
  console.log(req.body);
  const newArray = [];
  req.body.chosenExercise.forEach((exercise) => {
    newArray.push(mongoose.Types.ObjectId(exercise));
  });
  console.log('newarray2', newArray);
  User.findByIdAndUpdate(
    req.session.user._id,
    { $push: { chosenExercise: { $each: newArray } } },
    { safe: true, upsert: true, new: true }
  )
    .then(() => {
      return User.findById(req.session.user._id);
    })
    .then((users) => {
      console.log('newupdated', users);
      res.render('tracker', users);
    });
});

module.exports = router;
