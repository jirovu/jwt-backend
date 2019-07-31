const jwt = require('jsonwebtoken');

/**
 * This class used to generates JWT token and verifies JWT token
 */
class JwtProvider {
    constructor() { }

    jwtGenerate(user) {
        let jwtToken = jwt.sign(
            {
                sub: user.username,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRATION_TIME });
        return jwtToken;
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY);
    }

    getEmailFromToken(req) {
        let token = req.cookies['access_token'];
        let payload = this.verifyToken(token);
        return payload.sub;
    }
}

module.exports = JwtProvider;