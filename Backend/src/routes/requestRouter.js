const express = require('express');
const authValidation = require('../middleware/auth');
const UserSchema = require('../model/devUser');
const ConnectionSchema = require('../model/devConnection');
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', authValidation, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const validStatus = ['interested', 'ignored'];
        if(!validStatus.includes(status)){
            return res.status(401).json({
                message: 'Invalid status type'
            })
        }

        const validToUserId = await UserSchema.findOne({ _id: toUserId });
        if(!validToUserId){
            return res.status(401).json({
                message: 'User not found!'
            })
        }

        const checkRequest = await ConnectionSchema.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(checkRequest){
            return res.status(401).json({
                message: 'Request has already sended'
            })
        }

        const saveConnections = new ConnectionSchema({
            fromUserId,
            toUserId,
            status
        });

        await saveConnections.save();

        res.status(200).json({
            message: 'Request send successfully!!',
            data: saveConnections
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

requestRouter.post('/request/review/:status/:requestId', authValidation, async (req, res) => {
    try {
        const loginUser = req.user;
        const requestId = req.params.requestId;
        const status = req.params.status;

        const validStatus = ['accepted', 'rejected'];
        if(!validStatus.includes(status)){
            return res.status(401).json({
                message: 'Invalid status type'
            })
        }

        const validRequestId = await ConnectionSchema.findOne({ _id: requestId});
        if(!validRequestId){
            return res.status(401).json({
                message: 'Request not found!!'
            })
        }

        const validConnectionRequest = await ConnectionSchema.findOne({
            toUserId: loginUser._id,
            _id: requestId,
            status: 'interested'
        });

        validConnectionRequest.status = status;

        await validConnectionRequest.save();

        res.status(200).json({
            message: `Request ${status}`,
            data: validConnectionRequest
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = requestRouter;