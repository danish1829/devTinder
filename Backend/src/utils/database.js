const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://summermunda101:8vBI6925WEMO0Oes@cluster1.fsbx9.mongodb.net/devTinder'
        );
}

module.exports =  connectDB ;