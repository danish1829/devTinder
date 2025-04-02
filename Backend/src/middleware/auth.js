const jwt = require('jsonwebtoken');
const UserSchema = require('../model/devUser');

const authValidation = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            return res.status(401).json({
                message: 'Token not found!!'
            })
        }   

        const validateToken = jwt.verify(token, 'Aman');
        const { _id } = validateToken;

        const user = await UserSchema.findById({ _id });
        req.user = user;

        next();
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = authValidation;