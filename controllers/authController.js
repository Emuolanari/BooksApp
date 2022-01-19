const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require(`./../utils/appError`);
const jwt = require('jsonwebtoken');

const signJWT = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm

    });
    const token = signJWT(newUser._id);

    res.status(201).json({
        status: 'success',
        user: newUser,
        token
    })
})