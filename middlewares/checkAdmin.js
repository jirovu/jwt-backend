const JwtProvider = require('../services/jwtProvider');
const jwtProvider = new JwtProvider();

/**
 * This middelware used to check user admin
 * @function next() when user is ADMIN
 * @returns the error status to client if token is invalid
 */
module.exports = (req, res, next) => {
    let header = req.headers['access-control-request-headers'];
    if (header && header.includes('authorization')) {
        res.status(200).send();
    } else {
        let bearerToken = req.header('Authorization');
        if (bearerToken && bearerToken.startsWith('Bearer ')) {
            let jwtToken = bearerToken.substring(7);
            let payload = jwtProvider.verifyToken(jwtToken);

            if (payload.role === 'ADMIN') {
                next();
            } else {
                res.status(403).send();
            }
        } else {
            res.status(403).send();
        }
    }
};