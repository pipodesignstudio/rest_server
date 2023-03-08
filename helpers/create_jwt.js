const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject)=> {
        const payload = { uid };
        jwt.sign( payload , process.env.SECRETORPRIVATEKEY, {
            expiresIn: '48h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se ha podido generar el JWT');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}