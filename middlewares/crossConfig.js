module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.URL_ACCEPT);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
    next();
}