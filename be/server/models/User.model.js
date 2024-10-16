const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userAddress: {
        type: "string",
        required: true
    },
    encrypton: {
        type: Buffer,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const UserModel = mongoose.model('users', User);
module.exports = UserModel;
