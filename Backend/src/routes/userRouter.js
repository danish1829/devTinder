const express = require('express');
const UserSchema = require('../model/devUser');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authValidation = require('../middleware/auth');

userRouter.post('/signup', async (req, res) => {
    try {
        const {firstName, lastName, email, password, age, gender, location, photoURL, about, skills} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserSchema({
            firstName,
            lastName,
            email,
            password: hashPassword,
            age,
            gender,
            location,
            photoURL,
            about,
            skills
        });
        
        await newUser.save();

        const token = jwt.sign({ _id : newUser._id}, 'Aman', {expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)})
        res.cookie('token', token,
            {expires: new Date(Date.now() + 8 * 3600000)});

        res.json({
            message: 'new user created successfully',
            data: newUser,
        })
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            message: error.message
        });
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({email});
        if(!user){
            res.status(401).json({
                message: 'user not found!'
            });
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword){
            res.status(401).json({
                message: 'Invalid password!!'
            })
        }

        const token = jwt.sign({ _id : user._id}, 'Aman', {expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)})

        res.cookie('token', token,
            {expires: new Date(Date.now() + 8 * 3600000)});
        res.status(200).json({
            message: 'user login successfully!!',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

userRouter.post('/logout', authValidation, async (req, res) => {
    try {
        res.cookie('token', null, {expires: new Date(Date.now())});
        res.status(200).json({
            message: 'Logout successfully!!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = userRouter;
