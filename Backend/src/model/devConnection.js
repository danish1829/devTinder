const mongoose = require('mongoose');

const devConnection = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserDev'
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserDev'
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['interested','ignored','accepted','rejected'],
            message: '{VALUE} invalid status type'
        }
    }
},{timestamps: true})

devConnection.index({ fromUserId: 1, toUserId: 1 })

const ConnectionSchema = mongoose.model('ConnectionDev', devConnection);
module.exports = ConnectionSchema;