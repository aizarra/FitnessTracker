const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');

router.post('/user/chosenExercises', (req, res, next) => {
  console.log(req.body);

  const chosenExercises = req.body.chosenExercise.map((exercise) => {
    return mongoose.Types.ObjectId(exercise);
  });

  User.findOneAndUpdate(
    { _id: req.session.user._id },
    { chosenExercise: chosenExercises },
    { new: true }
  ).then((User) => {
    console.log(User);
    //     res.render('tracker.hbs', { workouts: allTheExercisesFromDB });
    //   })
    //   .catch((error) => {
    //     console.log('Error while getting the exercises from the DB: ', error);
    //     next(error);
  });
});

module.exports = router;
