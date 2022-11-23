const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise.model');

router.post('/user/chosenExercises', (req, res, next) => {
  console.log('request', req.body.chosenExercise);
  const exercises = req.body.chosenExercise;
  const exercisesObjectId = exercises.map((exercise) => {
    console.log('exercise', exercise);
    const XR = mongoose.Types.ObjectId(exercise);
    console.log('XR', XR);
    return XR;
  });
  console.log('XT', exercisesObjectId);
  User.findByIdAndUpdate(
    req.session.user._id,
    { chosenExercise: exercisesObjectId },
    { new: true }
  ).then((users) => {
    console.log('newupdated', users);
    res.render('tracker', users);
  });
});

module.exports = router;
