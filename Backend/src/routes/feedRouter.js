const express = require('express');
const authValidation = require('../middleware/auth');
const ConnectionSchema = require('../model/devConnection');
const UserSchema = require('../model/devUser');
const feedRouter = express.Router();

feedRouter.get('/user/requests/received', authValidation, async (req, res) => {
    try {
        const loginUser = req.user;
        const getRequest = await ConnectionSchema.find({
            toUserId: loginUser._id,
            status: 'interested'
        }).populate('fromUserId', ['firstName', 'lastName','photoURL','location','age','gender' ])

        if(!getRequest){
            return res.status(401).json({
                message: 'Unable to fetch the requests'
            })
        }

        res.status(200).json({
            message: 'All requests',
            data: getRequest
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

feedRouter.get('/user/connections', authValidation, async (req, res) => {
    try {
        const loginUser = req.user;
        const fetchConnections = await ConnectionSchema.find({
            $or: [
                { fromUserId: loginUser._id, status: 'accepted' },
                { toUserId: loginUser._id, status: 'accepted' }
            ]
        }).populate('fromUserId', ['firstName','lastName','age','gender','location','photoURL'])
        .populate('toUserId', ['firstName','lastName','age','gender','location','photoURL']);

        if(!fetchConnections){
            return res.status(401).json({
                message: 'something went wrong!!'
            })
        }

        const connections = fetchConnections.map((row) => {
            if(row.fromUserId._id.toString() == loginUser._id.toString()){
                return row.toUserId
            }else{
                return row.fromUserId
            }
        });

        res.status(200).json({
            message: 'All connections',
            data: connections
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

feedRouter.get('/user/feed', authValidation, async (req, res) => {
    try {
        const loginUser = req.user;
        const checkUser = await ConnectionSchema.find({
            $or: [
                { fromUserId: loginUser._id },
                { toUserId: loginUser._id }
            ]
        }).select('fromUserId toUserId status');

        if(!checkUser){
            return res.status(401).json({
                message: 'something went wrong!!'
            })
        }

        const hideUser = new Set();
        checkUser.forEach((connection) => {
            hideUser.add(connection.fromUserId.toString()),
            hideUser.add(connection.toUserId.toString())
        })

        const getFeed = await UserSchema.find({
            $and: [
                { _id: { $nin: Array.from(hideUser) } },
                { _id: { $ne: loginUser._id } }
            ]
        }).select('firstName lastName age gender location photoURL')

        res.status(200).json({
            message: 'Your Feeds',
            data: getFeed
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = feedRouter;