const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/sessions', (req, res, next) => {
  res.render('sessions');
});

module.exports = router;
