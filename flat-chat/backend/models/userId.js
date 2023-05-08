const mongoose = require('mongoose');


const userIdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true
    }
});



module.exports = mongoose.model('UserID', userIdSchema);
