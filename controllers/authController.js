const { promisify } = require('util');
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
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });
    const token = signJWT(newUser._id);

    res.status(201).json({
        status: 'success',
        user: newUser,
        token
    })
})


exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next(new AppError('Please provide username and password', 400))
    }

    const user = await User.findOne({ username: username }).select('+password');
    if (!user || !await user.comparePasswords(password, user.password)) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const token = signJWT(user._id);;
    res.status(200).json({
        status: 'success',
        token
    })
});

exports.protect = catchAsync(async (req, res, next) => {
    //Get the token and check if it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Please login to get access', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new AppError('The user belonging to the token no longer exists', 401))
    }

    if (freshUser.changesPasswordAfter(decoded.iat)) {
        return next(new AppError('Password recently changed', 401))
    };

    req.user = freshUser

    next();
})