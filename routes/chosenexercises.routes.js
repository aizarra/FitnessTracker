const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise.model');

router.post('/user/chosenExercises', (req, res, next) => {
  console.log('request', req.body.chosenExercise);
  const exercises = req.body.chosenExercise;
  const exercisesObjectId = exercises.map((exercise) => {
    const XR = mongoose.Types.ObjectId(exercise);
    return XR;
  });
  User.findByIdAndUpdate(
    req.session.user._id,
    { chosenExercise: exercisesObjectId },
    { new: true }
  ).then((users) => {
    res.render('tracker', users);
  });
});

module.exports = router;
