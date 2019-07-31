var express = require('express');
const JwtProvider = require('../services/jwtProvider');
const jwtProvider = new JwtProvider();
var router = express.Router();
const data = require('../data');

/* GET users listing. */
router.get('/getAllItem', function (req, res, next) {
  let bearerToken = req.header('authorization');
  if (bearerToken && bearerToken.startsWith('Bearer ')) {
    let jwtToken = bearerToken.substring(7);
    let payload = jwtProvider.verifyToken(jwtToken);

    const items = data.filter(user => user.username === payload.sub)[0].cart;
    console.log(items);
    res.status(200).send(items);
  } else {
    res.status(403).send();
  }
});

module.exports = router;
