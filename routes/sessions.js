const express = require('express');
const router = express.Router();

router.get('/sessions', (req, res, next) => {
  res.render('sessions');
});

module.exports = router;
