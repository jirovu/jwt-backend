var express = require('express');
var router = express.Router();
const data = require('../data');

/* GET home page. */
router.get('/getAllItem', function (req, res, next) {
  let items = data.filter(user => user.username === 'admin')[0].cart;
  res.status(200).send(items);
});

module.exports = router;
