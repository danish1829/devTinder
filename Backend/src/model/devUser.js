const mongoose = require('mongoose');
const validator = require('validator');

const devUser = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: 'Invalid email type'
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isStrongPassword(value)
            },
            message: 'week password'
        }
    },
    age: {
        type: Number,
        validate: {
            validator: function(value){
                return value > 15
            },
            message: 'Age must be greater than 15'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['male','female','other'],
            message: 'Invalid gender type ${VALUE}'
        }
    },
    location: {
        type: String,
    },
    photoURL: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2013/07/12/14/36/man-148582_1280.png'
    },
    about: {
        type: String,
    },
    skills: {
        type: [String],
        validate: {
            validator: function(value){
                return value.length <= 5
            },
            message: 'minimum 5 skills can be added'
        }
    }
});

const UserSchema = mongoose.model('UserDev', devUser);
module.exports = UserSchema;