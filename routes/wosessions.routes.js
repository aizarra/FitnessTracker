const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');
// const Exercise = require('../models/Exercise.model');

router.post('/wosessions', (req, res, next) => {
  console.log('request', req.body);
  const woentry = req.body;
  console.log(req.session);
  const currentUser = req.session.currentUser._id;
  //   const wosessionObjectId = mongoose.Types.ObjectId(woentry);
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { wosession: woentry },
    { new: true }
  ).then((currentUser) => {
    console.log(currentUser.wosession);
    res.render('profiletemp', { currentUser });
  });
});

module.exports = router;
