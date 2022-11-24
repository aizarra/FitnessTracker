const router = require('express').Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const Wosession = require('../models/Wosession.model');

router.post('/wosessions', (req, res, next) => {
  console.log('request', req.body);
  const woentry = req.body;
  //   console.log(req.session);
  const currentUserId = req.session.currentUser._id;
  let wosession = [];
  for (let i = 0; i < req.body.name.length; i++) {
    let obj = {
      user_id: mongoose.Types.ObjectId(currentUserId),
      name: req.body.name[i],
      weight: req.body.weight[i],
      reps: req.body.weight[i],
      sets: req.body.sets[i],
    };

    wosession.push(obj);
  }

  console.log('newArray: ', wosession);

  //   const wosessionObjectId = mongoose.Types.ObjectId(woentry);
  Wosession.insertMany(wosession).then((currentObj) => {
    console.log(currentObj);
    res.render('profiletemp', { wosession: currentObj });
  });
});

module.exports = router;
