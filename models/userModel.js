const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords do not match'
        }
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.pre('save', async function (next) {
    console.log(this.password)
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password)
    this.passwordConfirm = undefined;
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;