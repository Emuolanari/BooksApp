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
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: (el) => {
                return el === this.password
            },
            maessage: 'Passwords do not match'
        }
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified(password)) return next()
    this.password = bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})
const User = mongoose.model('User', userSchema);

module.exports = User;