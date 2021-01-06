const userModel = require('../models/User.model');
const userService = {};

userService.create = userInfo => {
    return userModel.create(userInfo);
};

userService.findUserByEmail = userEmail => {
    return userModel.findOne({email: userEmail});
};

module.exports = userService;