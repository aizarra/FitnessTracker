const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise.model');

router.post('/user/chosenExercises', (req, res, next) => {
  console.log('BODY: ', req.body);
  const exercises = req.body.chosenExercise;
  const exercisesObjectId = exercises.map((exercise) => {
    const XR = mongoose.Types.ObjectId(exercise);
    return XR;
  });
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { chosenExercise: exercisesObjectId },
    { new: true }
  )
    .populate('chosenExercise')
    .then((currentUser) => {
      console.log(currentUser);
      res.render('tracker', { currentUser });
    });
});

module.exports = router;
