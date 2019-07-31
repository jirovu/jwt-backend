const JwtProvider = require('../services/jwtProvider');
const jwtProvider = new JwtProvider();

module.exports = (req, res, next) => {
    let header = req.headers['access-control-request-headers'];
    if (header && header.includes('authorization')) {
        res.status(200).send();
    } else {
        let bearerToken = req.header('authorization');
        if (bearerToken && bearerToken.startsWith('Bearer ')) {
            let jwtToken = bearerToken.substring(7);
            let payload = jwtProvider.verifyToken(jwtToken);

            if (payload.role === 'USER') {
                next();
            } else {
                res.status(403).send();
            }
        } else {
            res.status(403).send();
        }
    }
};