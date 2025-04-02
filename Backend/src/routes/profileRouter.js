const express = require('express');
const authValidation = require('../middleware/auth');
const editValidation = require('../utils/validation');
const profileRouter = express.Router();

profileRouter.get('/profile/view', authValidation, async (req, res) => {
    try {
        const loginUser = req.user;
        
        if(!loginUser){
            res.status(401).json({
                message: 'user not found!!'
            })
        }
        res.status(200).json({
            data: loginUser,
            message: 'user profile'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

profileRouter.patch('/profile/edit', authValidation, async (req, res) => {
    try {
        
        if(!editValidation(req)){
            return res.status(401).json({
                message: 'Upades not allowed!!'
            })
        }
        const loginUser = req.user;
        Object.keys(req.body).forEach((key) => loginUser[key] = req.body[key]);

        await loginUser.save();
        
        res.status(200).json({
            data: loginUser,
            message: 'Profile updated successfully!!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = profileRouter;