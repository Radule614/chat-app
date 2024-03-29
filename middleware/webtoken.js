const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;



createToken = (data) => {
    const token = jwt.sign(data, secret);
    return token;
}

checkTokenValidity = (req, res, next) => {
    const token = req.header('x-auth');

    if(!token) return next();
    let checked = null;
    try {
        checked = jwt.verify(token, secret);
    }catch(err) {
        console.log(err.message);
        return res.status(400).send({err: "Token not valid"});
    }
    
    req.payload = checked;
    next();
}   

checkIfTokenExists = (req, res, next) => {
    const token = req.header('x-auth');
    if(!token) return res.status(403).send({ err: 'Token doesnt exist!'});
    next();
}


module.exports = { createToken, checkTokenValidity, checkIfTokenExists }