const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: 
    {
        type: String,
        required: true,
        unique:true
        },
    gender: 
    { 
        type: String, 
        required: true
    },
    status: 
    {
        type: String, 
        enum: ['Active', 'Inactive'], default: 'Active' 
    }
});

module.exports = mongoose.model('User', userSchema);
