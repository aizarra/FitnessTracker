const express = require('express');
const router = express.Router();

const Exercise = require('../models/Exercise.model');

router.get('/workouts', (req, res, next) => {
  Exercise.find()
    .then((allTheExercisesFromDB) => {
      // console.log('Retrieved exercises from DB:', allTheExercisesFromDB);
      res.render('workouts.hbs', {
        workouts: allTheExercisesFromDB,
      });
    })
    .catch((error) => {
      console.log('Error while getting the exercises from the DB: ', error);
      next(error);
    });
});

module.exports = router;
