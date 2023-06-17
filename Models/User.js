import mongoose from "mongoose";
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: { unique: true, dropDups: true }
    },
    image: {
        type: String,

    },
    age: {
        type: Number
    },
    mobile: {
        type: Number,
        required: true,
        maxLength: 10
    },
    interest: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }

})

export default mongoose.model('user', userSchema)
