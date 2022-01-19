const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require(`./../utils/appError`);

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm

    });

    res.status(201).json({
        status: 'success',
        user: newUser
    })
})