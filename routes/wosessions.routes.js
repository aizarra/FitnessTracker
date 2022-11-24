const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');
// const Exercise = require('../models/Exercise.model');

router.post('/wosessions', (req, res, next) => {
  console.log('request', req.body);
  const woentry = req.body;
  console.log(req.session);
  const currentUser = req.session.currentUser;
  let wosession = [];
  for (let i = 0; i < req.body.name.length; i++) {
    let obj = {
      name: req.body.name[i],
      weight: req.body.weight[i],
      reps: req.body.weight[i],
      sets: req.body.sets[i],
    };

    wosession.push(obj);
  }

  console.log('newArray: ', wosession);

  //   const wosessionObjectId = mongoose.Types.ObjectId(woentry);
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $push: { wosession: { $each: wosession } } },
    { new: true }
  ).then((currentUser) => {
    console.log(currentUser.wosession);
    res.render('profiletemp', { currentUser });
  });
});

module.exports = router;
