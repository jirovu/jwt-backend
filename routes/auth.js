const express = require('express');
const router = express.Router();
const JwtProvider = require('../services/jwtProvider');
const jwtProvider = new JwtProvider();
const data = require('../data');

/* GET home page. */
router.post('/login', function (req, res, next) {
    let user = req.body;
    let isRealUser = data.filter(u => u.username === user.username && u.password === user.password)[0];
    if (isRealUser) {
        console.log('ok');
        if (user.username === 'admin') {
            user.role = 'ADMIN'
        } else {
            user.role = 'USER'
        }
        let jwtToken = jwtProvider.jwtGenerate(user);

        res.cookie('access_token', jwtToken, { maxAge: process.env.EXPIRATION_TIME });
        res.status(200).send(jwtToken);
    } else {
        res.status(200).send('');
    }
});

module.exports = router;
