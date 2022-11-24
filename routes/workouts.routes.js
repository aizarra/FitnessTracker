const express = require('express');
const router = express.Router();

const Exercise = require('../models/Exercise.model');

router.get('/user/addWorkout', (req, res, next) => {
  Exercise.find()
    .then((allTheExercisesFromDB) => {
      const uniqueTargetArray = [
        ...new Set(
          allTheExercisesFromDB.map((exercise) => {
            return exercise.target;
          })
        ),
      ];
      const uniqueEquipmentArray = [
        ...new Set(
          allTheExercisesFromDB.map((exercise) => {
            return exercise.equipment;
          })
        ),
      ];
      res.render('exercises/addWorkout.hbs', {
        workouts: allTheExercisesFromDB,
        targets: uniqueTargetArray,
        machines: uniqueEquipmentArray,
      });
    })
    .catch((error) => {
      console.log('Error while getting the exercises from the DB: ', error);
      next(error);
    });
});

module.exports = router;
