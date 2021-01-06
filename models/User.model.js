const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password:{
        type: String,
        trim: true,
        required: true,
    }
},{
    timestamps: true,
    versionKey:false,
});

module.exports = mongoose.model('User', userSchema);