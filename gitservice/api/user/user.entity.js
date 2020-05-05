const mongoose  = require('mongoose');

const UserSchema  = new mongoose.Schema({
    _id: { type: String, required: true },
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    token:{ type:String,  required: true },
    createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);