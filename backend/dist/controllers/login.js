"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@himanshu_guptaorg/utils");
const user_1 = require("../models/user");
const utils_2 = require("@himanshu_guptaorg/utils"); // Assuming comparePasswords is a utility function to compare hashed passwords
const login = (0, utils_1.async_error_handler)(async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'sendCompleteInfo' }],
            statusCode: 400,
        });
    }
    const user = await user_1.UserModel.findOne({ name });
    if (!user) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'invalidCredentials' }],
            statusCode: 401,
        });
    }
    const isPasswordCorrect = await (0, utils_2.checkPasswords)(password, user.password);
    if (!isPasswordCorrect) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'invalidCredentials' }],
            statusCode: 401,
        });
    }
    const token = await (0, utils_1.createJwt)({ payload: { _id: user._id }, options: {} }, process.env.JWT_SECRET);
    const response = new utils_1.Custom_response(true, null, { token, name }, 'success', 201, null);
    res.json(response);
});
exports.default = login;
