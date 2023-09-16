var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Daily Tracker' });
});

router.get('/about', function(req, res, next) {
  res.render('./pages/aboutUs', { title: 'About Us' });
});

router.get('/help', function(req, res, next) {
  res.render('./pages/help', { title: 'About Us' });
});

module.exports = router;
